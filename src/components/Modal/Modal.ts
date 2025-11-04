import Block from '../../core/block';
import { Button } from '../Button';

type ModalProps = {
  title: string;
  body?: string;
  labelCancel: boolean;
  ButtonOk: Button;
  ButtonCancel: Button;
  onSubmit?: (e: SubmitEvent) => void;
};

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super('div', {
      ...props,
      className: 'modal-container',
      title: props.title,
      ButtonOk: props.ButtonOk,
      ButtonCancel: props.ButtonCancel,
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
                    <input type="file" name="avatar" id="avatar" placeholder="Выбрать файл на компьютере" />
                </div>
                <div class="modal-footer">
                    {{{ ButtonOk }}}
                    {{#if labelCancel}}
                        {{{ ButtonCancel }}}
                    {{/if}}
                </div>
            </form>
        `;
  }
}
