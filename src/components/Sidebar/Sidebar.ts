import Block from '../../core/block';
import { withRouter } from '../../utils/withRouter';
import { ActionButton } from '../ActionButton';
import ChatListItem, { type ChatListItemProps } from '../ChatListItem/ChatListItem';
import { ProfileLink } from '../ProfileLink';
import * as chatsApi from '../../services/chats';
import { connect } from '../../utils/connect';
import type { StoreProps } from '../../core/Store';
import type { ChatsResponse } from '../../api/type';

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
          chatsApi.postCreateChat({
            title: 'Новый чат 3',
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
    if (!this.props.chatsList) {
      return 'Loading';
    }

    const chatComponents = (this.props.chatsList as ChatsResponse)?.map(el => {
      return new ChatListItem({
        name: el.title,
        onChatClick: () => {
          window.store.set({
            messages: window.store.state.messages,
            chatHeader: {
              title: el.title,
            },
          });
        },
        time: el.last_message?.time,
        pic: el.avatar,
        text: el.last_message?.content,
        unread: el.unread_count,
      });
    });

    this.children.chatsList = chatComponents;

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
