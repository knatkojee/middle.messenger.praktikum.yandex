import Block from '../../core/block';
import type { StoreProps } from '../../core/store';
import { connect } from '../../utils/connect';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { InputModal } from '../InputModal';
import { Modal } from '../Modal';
import { OptionsButton } from '../OptionsButton';
import * as chatServices from '../../services/chats';

export type ChatHeaderProps = {
  title: string;
  pic?: string;
  members?: number;
};

class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super('header', {
      ...props,
      className: 'chat-header',
      title: props.title,
      pic: props.pic,
      members: props.members,
      OptionsButton: new OptionsButton({}),
      Avatar: new Avatar({
        src: props.pic,
        alt: props.title,
        className: 'chat-avatar',
        canChange: true,
        onClick: () => {
          this.setProps({
            showAvatarModal: true,
          });
        },
      }),
      AvatarModal: new Modal({
        title: 'Загрузите файл',
        labelCancel: true,
        onSubmit: e => {
          e.preventDefault();

          if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const avatar = formData.get('avatar') as File;

            if (avatar) {
              chatServices.postUpdateChatAvatar({
                chatId: window.store.state.selectedChat,
                avatar,
              })
            }
          }

          this.setProps({
            showAvatarModal: false,
          });
        },
        ButtonOk: new Button({
          label: 'Подтвердить',
          type: 'submit',
        }),
        ButtonCancel: new Button({
          label: 'Отмена',
          type: 'button',
          isSecondary: true,
          onClick: () => {
            this.setProps({
              showAvatarModal: false,
            });
          },
        }),
      }),
    });
  }

  render(): string {
    const InputModalComponent = new InputModal({
      isOpen: (this.props.isModalOpen as boolean) ?? false,
      text: (this.props.modalText as string) ?? '',
      onCancel: () => {
        window.store.set({
          inputModal: { isOpen: false },
        });
      },
      onSubmit: this.props.onModalSubmit as () => void,
      selectedChat: this.props.selectedChat as number | undefined,
    });

    this.children.InputModal = InputModalComponent;

    return `
        <div class='active-user-info'>
          <div class='active-user-avatar'>
            {{{ Avatar }}}
          </div>
          <div class='chat-header-container'>
            <h2 class='active-user-name'>{{ title }}</h2>
            <p class='active-user-members'>участников: {{ members }}</p>
          </div>
        </div>
        <div class='header-button-wrapper'>
          {{{ OptionsButton }}}
        </div>

        {{#if isModalOpen}}
          <div data-id="${InputModalComponent.id}">
        {{/if}}

        {{#if showAvatarModal}}
          {{{ AvatarModal }}}
        {{/if}}
        `;
  }
}

const mapPropsToState = (state: StoreProps) => {
  return {
    isModalOpen: state.inputModal?.isOpen,
    modalText: state.inputModal?.text,
    onModalSubmit: state.inputModal?.onSubmit,
    selectedChat: state.selectedChat,
  };
};

export default connect(mapPropsToState)(ChatHeader);
