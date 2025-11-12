import EventBus from './eventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

type Values<T> = T[keyof T];
type Events = Values<typeof Block.EVENTS>;

interface BlockChildren {
  [key: string]: Block | Block[];
}

interface EventListeners {
  blur?: (e: FocusEvent) => void;
  submit?: (e: SubmitEvent) => void;
  click?: (e: PointerEvent) => void;
  input?: (e: InputEvent) => void;
  change?: (e: Event) => void;
}

interface BaseProps {
  events?: EventListeners;
  attrs?: Record<string, string | boolean>;
  className?: string;
  [key: string]: unknown;
}

export default abstract class Block<P extends BaseProps = BaseProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _element: HTMLElement | null = null;
  _meta: { tagName: string; props: P } | null = null;
  _id: string = nanoid(6);
  _isRendering = false;
  children: BlockChildren;
  props: P;
  eventBus: () => EventBus<Events>;
  id: string = this._id;

  constructor(tagName: string = 'div', propsWithChildren: P = {} as P) {
    const eventBus = new EventBus<Events>();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;
    this.props = this._makePropsProxy(props);

    this._meta = {
      tagName,
      props,
    };

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<Events>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    const { tagName, props } = this._meta!;
    this._element = this._createDocumentElement(tagName);

    if (typeof props.className === 'string') {
      const classes = props.className.split(' ');
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === 'object' && props.attrs !== null) {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        if (typeof attrValue === 'string') {
          this._element!.setAttribute(attrName, attrValue);
        }
      });
    }
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _getChildrenAndProps(propsAndChildren: P): {
    children: Record<string, Block | Block[]>;
    props: P;
  } {
    const children: Record<string, Block | Block[]> = {};
    const props = {} as { [K in keyof P]: P[K] };

    (Object.entries(propsAndChildren) as [keyof P, unknown][]).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every(item => item instanceof Block)) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value as P[keyof P];
      }
    });

    return { children, props };
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(oldProps?: P): void {
    // console.log(oldProps);
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: P, _newProps: P): boolean {
    return true;
  }

  setProps = (nextProps: P): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _addEvents(): void {
    const events = (this.props as { events?: EventListeners }).events;

    if (!events) return;

    Object.entries(events).forEach(([eventName, handler]) => {
      if (typeof handler === 'function' && this._element) {
        this._element.addEventListener(eventName, handler as EventListener);
      }
    });
  }

  _removeEvents(): void {
    const events = (this.props as { events?: EventListeners }).events;

    if (!events) return;

    Object.entries(events).forEach(([eventName, handler]) => {
      if (typeof handler === 'function' && this._element) {
        this._element.removeEventListener(eventName, handler as EventListener);
      }
    });
  }

  _compile(): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = {};

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(component => `<div data-id="${component.id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    const templateString = this.render();
    const template = Handlebars.compile(templateString);

    fragment.innerHTML = template({ ...this.props, ...propsAndStubs });

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(component => {
          const stub = fragment.content.querySelector(`[data-id="${component.id}"]`);
          const content = component.getContent();
          if (stub && content) {
            stub.replaceWith(content);
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        const content = child.getContent();
        if (stub && content) {
          stub.replaceWith(content);
        }
      }
    });

    return fragment.content;
  }

  _render(): void {
    if (this._isRendering) {
      return;
    }

    this._isRendering = true;

    try {
      this._removeEvents();
      const block = this._compile();

      if (this._element!.children.length === 0) {
        this._element!.appendChild(block);
      } else {
        this._element!.replaceChildren(block);
      }

      this._addEvents();
    } finally {
      this._isRendering = false;
    }
  }

  render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: P): P {
    const eventBus = this.eventBus?.();

    if (!eventBus) {
      return props;
    }

    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get(target: P, prop: string) {
        const value = target[prop as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: P, prop: string, value: unknown) {
        const oldTarget = { ...target };
        (target as Record<string, unknown>)[prop] = value;

        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as P;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    const content = this.getContent();

    if (content) {
      content.style.display = 'block';
    }
  }

  hide(): void {
    const content = this.getContent();

    if (content) {
      content.style.display = 'none';
    }
  }
}
