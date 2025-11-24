import { HOST } from '../../constants';
import Block from '../../core/block';

export type ChatListItemProps = {
  id: number;
  name: string;
  time: string;
  onChatClick: (e: MouseEvent) => void;
  text?: string;
  unread?: number;
  pic?: string;
};

class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    super('button', {
      ...props,
      className: 'chat-item',
      attrs: {
        type: 'button',
      },
      events: {
        click: props.onChatClick,
      },
      name: props.name,
      time: props.time,
      text: props.text,
      unread: props.unread,
      pic: props.pic,
      id: props.id,
    });
  }

  render(): string {
    return `
          <div class='chat-user-info'>
            <div class='user-avatar'>
              {{#if pic}}
                <img class='avatar' src='${HOST}/resources/${this.props.pic}' alt='{{ name }}' />
              {{/if}}
            </div>
            <div class='user-details'>
              <h3 class='user-name'>{{ name }}</h3>
              <p class='last-message'>{{ text }}</p>
            </div>
          </div>
          <div class='chat-meta'>
            <time class='message-time'>{{ time }}</time>
            {{#if unread}}
              <div class='unread-badge'>
                <span>{{ unread }}</span>
              </div>
            {{/if}}
          </div>
      `;
  }
}

export default ChatListItem