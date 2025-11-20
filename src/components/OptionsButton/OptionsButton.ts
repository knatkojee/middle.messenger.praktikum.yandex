import Block from '../../core/block';
import { SystemAction } from '../SystemAction';
import * as chatsApi from '../../services/chats';

type ButtonProps = {
  isOpen?: boolean;
};

export default class OptionsButton extends Block {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      className: 'message-page-button chat-options',
      ButtonAdd: new SystemAction({
        label: 'Добавить пользователя',
        isAddIcon: true,
        onClick: () => {
          window.store.set({
            inputModal: {
              isOpen: true,
              text: `Введите id юзера (ваш id: ${window.store.state?.user?.id})`,
              onSubmit: (e: SubmitEvent) => {
                e.preventDefault();

                if (e.target instanceof HTMLFormElement) {
                  const formData = new FormData(e.target);
                  const data = Object.fromEntries(formData);

                  chatsApi.putChatUsers({
                    chatId: window.store.state.selectedChat,
                    users: [Number(data.modal_input)],
                  });
                }
              },
            },
          });
        },
      }),
      ButtonDelete: new SystemAction({
        label: 'Удалить пользователя',
        isDeleteIcon: true,
        onClick: () => {
          console.log('delete user from chat');
        },
      }),
      events: {
        click: () => {
          this.setProps({
            isOpen: !this.props.isOpen,
          });
        },
      },
    });
  }
  public render(): string {
    return `
        <svg width='3' height='15' viewBox='0 0 3 15' fill='none' xmlns='http://www.w3.org/2000/svg' >
          <circle cx='1.5' cy='1.5' r='1.5' fill='var(--main-color)' />
          <circle cx='1.5' cy='7.5' r='1.5' fill='var(--main-color)' />
          <circle cx='1.5' cy='13.5' r='1.5' fill='var(--main-color)' />
        </svg>

        <div class='system-message {{#if isOpen}}popup-open{{/if}}'>
            {{{ ButtonAdd }}}
            {{{ ButtonDelete }}}
          </div>
    `;
  }
}
