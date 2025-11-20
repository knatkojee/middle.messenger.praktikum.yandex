import Block from '../../core/block';
import { Button } from '../Button';
import Input from '../Input/Input';

type InputModalProps = {
  isOpen: boolean;
  text: string;
  onSubmit: (e: SubmitEvent) => void;
  onCancel: (e: PointerEvent) => void;
  selectedChat?: number;
};

export default class InputModal extends Block {
  constructor(props: InputModalProps) {
    super('div', {
      ...props,
      className: 'modal-container',
      title: props.text,
      ButtonOk: new Button({
        label: 'Продолжить',
        type: 'submit',
      }),
      ButtonCancel: new Button({
        label: 'Отмена',
        type: 'button',
        isSecondary: true,
        onClick: props.onCancel,
      }),
      Input: new Input({
        name: 'modal_input',
        className: 'field-input underlined',
      }),
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render(): string {
    return `
            <form class="modal">
                <h2 class="modal-title">{{title}}</h2>
                <div class="modal-body">
                    {{{ Input }}}
                </div>
                <div class="modal-footer">
                    {{{ ButtonOk }}}

                    {{{ ButtonCancel }}}
                </div>
            </form>
        `;
  }
}
