import Block from '../../core/block';
import { withRouter } from '../../utils/withRouter';
import { ActionButton } from '../ActionButton';
import ChatListItem, { type ChatListItemProps } from '../ChatListItem/ChatListItem';
import { ProfileLink } from '../ProfileLink';
import * as chatsApi from '../../services/chats';
import { connect } from '../../utils/connect';
import type { StoreProps } from '../../core/Store';

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
            title: 'Новый чат 2',
          });
        },
      }),
    });
  }

  render(): string {
    console.log(this);

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

      {{#each chatsList}}
        {{{ this }}}
      {{/each}}

    </nav>
    <div class='sidebar-divider'></div>
  </div>
        `;
  }
}

const mapStateToProps = (state: StoreProps) => {
  console.log(state);

  return {
    chatsList: state.chats,
  };
};

export default connect(mapStateToProps)(withRouter(Sidebar));
