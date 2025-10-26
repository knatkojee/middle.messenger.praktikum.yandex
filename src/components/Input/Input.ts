import Block from '../../core/block';

type InputProps = {
  name: string;
  inputType: string;
  inputValue: string;
  onBlur?: (e: FocusEvent) => void;
  onClick?: () => void;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      className: `field-input`,
      attrs: {
        id: props.name,
        name: props.name,
        type: props.inputType,
        value: props.inputValue,
        autocomplete: false,
      },
      events: {
        blur: props.onBlur,
        click: props.onClick,
      },
    });
  }
}
