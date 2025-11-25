import type { ChatUserResponse } from '../../api/type';
import Block from '../../core/block';
import type { StoreProps } from '../../core/store';
import { connect } from '../../utils/connect';
import { Button } from '../Button';
import Input from '../Input/Input';

type InputModalProps = {
  isOpen: boolean;
  text: string;
  onSubmit: (e: SubmitEvent) => void;
  onCancel: (e: PointerEvent) => void;
  selectedChat?: number;
  showUsersList?: boolean;
};

class InputModal extends Block {
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
                  {{#if showUsersList}}
                    <div class='chat-users-container'>
                      ${(this.props.selectedChatUsers as ChatUserResponse)?.map((user) => `
                        <div>${user.id} – ${user.first_name} ${user.second_name}</div>
                      `)}
                    </div>
                  {{/if}}

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

const mapPropsToState = (state: StoreProps) => {
  return {
    selectedChatUsers: state.selectedChatUsers,
    showUsersList: state.selectedChatUsers?.length && state.selectedChatUsers.length > 0,
  };
};

export default connect(mapPropsToState)(InputModal);
