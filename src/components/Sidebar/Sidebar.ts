import Block from '../../core/block';
import { withRouter } from '../../utils/withRouter';
import { ActionButton } from '../ActionButton';
import ChatListItem, { type ChatListItemProps } from '../ChatListItem/ChatListItem';
import { ProfileLink } from '../ProfileLink';
import * as chatsApi from '../../services/chats';
import { connect } from '../../utils/connect';
import type { StoreProps } from '../../core/Store';
import type { ChatsResponse } from '../../api/type';
import { InputModal } from '../InputModal';

type SidebarProps = {
  chatsList: ChatListItemProps[];
};

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super('aside', {
      ...props,
      className: 'sidebar-column',
      chatsList: props.chatsList.map(el => {
        return new ChatListItem({
          ...el,
        });
      }),
      ProfileLink: new ProfileLink({}),
      AddChatButton: new ActionButton({
        label: 'Создать чат',
        onClick: () => {
          this.setProps({
            isModalOpen: true,
          });
        },
      }),
    });

    this.getChats();
  }

  async getChats() {
    await chatsApi.getChats();
  }

  render(): string {
    const chatComponents = ((this.props.chatsList as ChatsResponse) || [])?.map(el => {
      return new ChatListItem({
        name: el.title,
        onChatClick: () => {
          window.store.set({
            messages: window.store.state.messages,
            chatHeader: {
              title: el.title,
            },
            selectedChat: el.id,
          });
        },
        time: el.last_message?.time,
        pic: el.avatar,
        text: el.last_message?.content,
        unread: el.unread_count,
        id: el.id,
      });
    });

    this.children.chatsList = chatComponents;

    const InputModalComponent = new InputModal({
      isOpen: (this.props.isModalOpen as boolean) ?? false,
      text: 'Введите название чата',
      onCancel: () => {
        this.setProps({
          isModalOpen: false,
        });
      },
      onSubmit: (e: SubmitEvent) => {
        e.preventDefault();

        if (e.target instanceof HTMLFormElement) {
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);

          console.log(data);

          chatsApi
            .postCreateChat({
              title: data.modal_input as string,
            })
            .then(() => {
              this.setProps({
                isModalOpen: false,
              });
              window.location.reload();
            });
        }
      },
    });

    this.children.InputModal = InputModalComponent;

    return `
  <div class='sidebar-wrapper'>
    <nav class='sidebar-content'>
      <header class='profile-header'>
        {{{ AddChatButton }}}

        {{{ ProfileLink }}}

      </header>

      <div class='search-bar'>
        <span>Поиск</span>
      </div>

       ${chatComponents
         .map((_, index) => `<div data-id="${chatComponents[index].id}"></div>`)
         .join('')}

    </nav>
    <div class='sidebar-divider'></div>

    {{#if isModalOpen}}
          <div data-id="${InputModalComponent.id}">
        {{/if}}
  </div>
        `;
  }
}

const mapStateToProps = (state: StoreProps) => {
  return {
    chatsList: state.chats,
    chatHeader: state.chatHeader,
  };
};

export default connect(mapStateToProps)(withRouter(Sidebar));
