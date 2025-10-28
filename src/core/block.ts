import EventBus from './eventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

type Values<T> = T[keyof T];
type Events = Values<typeof Block.EVENTS>;

export interface BlockClass<P = any> extends Function {
  new (props: P): Block;
  componentName?: string;
}

type Props = Record<string, any>;

interface BlockChildren {
  [key: string]: Block | Block[];
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _element: HTMLElement | null = null;
  _meta: { tagName: string; props: Props } | null = null;
  _id: string = nanoid(6);
  children: BlockChildren;
  props: Props;
  eventBus: () => EventBus<Events>;
  id: string = this._id;

  constructor(tagName: string = 'div', propsWithChildren: Props = {}) {
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

  _getChildrenAndProps(propsAndChildren: Props): {
    children: Record<string, Block | Block[]>;
    props: Props;
  } {
    const children: Record<string, Block | Block[]> = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every(item => item instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(oldProps?: Props): void {
    console.log(oldProps);
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    console.log(oldProps);
    console.log(newProps);

    return true;
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      const handler = events[eventName];
      if (typeof handler === 'function') {
        this._element!.addEventListener(eventName, handler);
      }
    });
  }

  _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      const handler = events[eventName];
      if (typeof handler === 'function') {
        this._element!.removeEventListener(eventName, handler);
      }
    });
  }

  _compile(): DocumentFragment {
    const propsAndStubs: Props = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(component => `<div data-id="${component._id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(component => {
          const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
          stub?.replaceWith(component.getContent()!);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub?.replaceWith(child.getContent()!);
      }
    });

    return fragment.content;
  }

  _render(): void {
    this._removeEvents();
    const block = this._compile();

    if (this._element!.children.length === 0) {
      this._element!.appendChild(block);
    } else {
      this._element!.replaceChildren(block);
    }

    this._addEvents();
  }

  render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: Props): Props {
    const eventBus = this.eventBus?.();

    if (!eventBus) {
      return props;
    }

    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;

        // Запускаем обновление компоненты
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
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
