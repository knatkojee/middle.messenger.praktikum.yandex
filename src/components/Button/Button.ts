import Block from '../../core/block';

type ButtonProps = {
  type: 'submit' | 'button';
  label: string;
  isSecondary?: boolean;
  onClick?: (e: PointerEvent) => void;
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
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
