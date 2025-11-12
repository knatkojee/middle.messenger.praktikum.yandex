import Block from '../../core/block';
import ChatListItem, { type ChatListItemProps } from '../ChatListItem/ChatListItem';

type SidebarProps = {
  chatsList: ChatListItemProps[];
};

export default class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super('aside', {
      ...props,
      className: 'sidebar-column',
      chatsList: props.chatsList.map(el => {
        return new ChatListItem({
          ...el,
        });
      }),
    });
  }

  render(): string {
    return `
  <div class='sidebar-wrapper'>
    <nav class='sidebar-content'>
      <header class='profile-header'>
        <a class='profile-link' href='/profile'>Профиль</a>
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
