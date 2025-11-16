import Block from '../../core/block';
import { withRouter } from '../../utils/withRouter';
import ChatListItem, { type ChatListItemProps } from '../ChatListItem/ChatListItem';
import { ProfileLink } from '../ProfileLink';

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
    });
  }

  render(): string {
    return `
  <div class='sidebar-wrapper'>
    <nav class='sidebar-content'>
      <header class='profile-header'>
        {{{ ProfileLink }}}
        <svg width='6' height='9' viewBox='0 0 6 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0.353554 8.35355L4.35355 4.35355L0.353554 0.353546'
            stroke='var(--text-secondary-color)999'
          />
        </svg>

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

export default withRouter(Sidebar);
