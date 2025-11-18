import Block from '../../core/block';

export type ChatHeaderProps = {
  title: string;
  pic?: string;
};

class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super('header', {
      ...props,
      className: 'chat-header',
      title: props.title,
      pic: props.pic,
    });
  }

  render(): string {
    return `
        <div class='active-user-info'>
          <div class='active-user-avatar'></div>
          <h2 class='active-user-name'>{{ title }}</h2>
        </div>
        <div class='header-button-wrapper'>
          <button class='message-page-button chat-options' aria-label='Chat options'>
            <svg width='3' height='15' viewBox='0 0 3 15' fill='none' xmlns='http://www.w3.org/2000/svg' >
              <circle cx='1.5' cy='1.5' r='1.5' fill='var(--main-color)' />
              <circle cx='1.5' cy='7.5' r='1.5' fill='var(--main-color)' />
              <circle cx='1.5' cy='13.5' r='1.5' fill='var(--main-color)' />
            </svg>
          </button>
          <div class='system-message'>
            <div class='system-action'>
              <div class='action-icon'>
                <svg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg' >
                  <line x1='5.5' y1='3.27834e-08' x2='5.5' y2='11' stroke='var(--main-color)' stroke-width='1.5' />
                  <line y1='5.5' x2='11' y2='5.5' stroke='var(--main-color)' stroke-width='1.5' />
                </svg>

              </div>
              <span class='action-text'>Добавить пользователя</span>
            </div>
            <div class='system-action'>
              <div class='action-icon'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' >
                  <line x1='3.88909' y1='3.8892' x2='11.6673' y2='11.6674' stroke='var(--main-color)' stroke-width='1.5' />
                  <line x1='3.8891' y1='11.6673' x2='11.6673' y2='3.8891' stroke='var(--main-color)' stroke-width='1.5' />
                </svg>

              </div>
              <span class='action-text-alt'>Удалить пользователя</span>
            </div>
          </div>
        </div>
        `;
  }
}

export default ChatHeader;
