import Block from '../../core/block';

export default class Button extends Block {
  constructor(props: any) {
    super('button', {
      ...props,
      className: `button ${props.isSecondary ? 'button-secondary' : 'primary'}`,
      attrs: {
        type: props.type,
      },
      events: {
        click: props.onClick,
      },
    });
  }
  public render(): string {
    return `
      {{label}}
    `;
  }
}
