import Block from '../../core/block';

type SystemActionProps = {
  onClick: () => void;
  label: string;
  isAddIcon?: boolean;
  isDeleteIcon?: boolean;
};

export default class SystemAction extends Block {
  constructor(props: SystemActionProps) {
    super('div', {
      ...props,
      className: 'system-action',
      events: {
        click: props.onClick,
      },
    });
  }
  public render(): string {
    return `
          <div class='action-icon'>
           {{#if isAddIcon}}
            <svg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg' >
              <line x1='5.5' y1='3.27834e-08' x2='5.5' y2='11' stroke='var(--main-color)' stroke-width='1.5' />
              <line y1='5.5' x2='11' y2='5.5' stroke='var(--main-color)' stroke-width='1.5' />
            </svg>
          {{/if}}
          {{#if isDeleteIcon}}
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' >
              <line x1='3.88909' y1='3.8892' x2='11.6673' y2='11.6674' stroke='var(--main-color)' stroke-width='1.5' />
              <line x1='3.8891' y1='11.6673' x2='11.6673' y2='3.8891' stroke='var(--main-color)' stroke-width='1.5' />
            </svg>
          {{/if}}
          </div>
          <span class='action-text'>{{ label }}</span>
    `;
  }
}
