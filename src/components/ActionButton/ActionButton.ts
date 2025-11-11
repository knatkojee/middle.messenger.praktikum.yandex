import Block from '../../core/block';

type ActionButtonProps = {
  label: string;
  onClick: () => void;
  red?: boolean;
};

export default class ActionButton extends Block {
  constructor(props: ActionButtonProps) {
    super('button', {
      ...props,
      className: `action-button ${props.red && 'red'}`,
      events: {
        click: props.onClick,
      },
      label: props.label,
    });
  }

  render(): string {
    return `
        {{label}}
        `;
  }
}
