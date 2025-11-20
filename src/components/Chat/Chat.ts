import Block from '../../core/block';
import type { StoreProps } from '../../core/Store';
import { connect } from '../../utils/connect';
import { ChatHeader } from '../ChatHeader';
import type { ChatHeaderProps } from '../ChatHeader/ChatHeader';
import Message from '../Message/Message';
import type { MessageProps } from '../Message/Message';
import * as chatsApi from '../../services/chats';

type ChatProps = {
  messages?: MessageProps[];
  chatHeader?: {
    title: string;
    pic: string;
  };
  selectedChat: number;
};

class Chat extends Block {
  constructor(props: ChatProps) {
    super('div', {
      ...props,
      className: 'chat-wrapper',
    });
  }

  async getChatUsers(selectedChat: number) {
    await chatsApi.getChatUsers(selectedChat);
  }

  render(): string {
    const ChatHeaderComponent = new ChatHeader({
      title: (window.store.state.chatHeader as ChatHeaderProps).title,
      pic: (this.props.chatHeader as ChatHeaderProps).pic,
    });

    this.children.chatHeader = ChatHeaderComponent;

    const messageComponents = ((this.props.messages ?? []) as MessageProps[]).map(
      message =>
        new Message({
          text: message.text,
          isIncoming: message.isIncoming,
          time: message.time,
        })
    ) as Message[];

    this.children.messages = messageComponents;

    if (this.props?.selectedChat) {
      this.getChatUsers(this.props.selectedChat);
    }

    if (messageComponents.length === 0) {
      if (window.store.state.chats.length !== 0) {
        return `
          <div data-id="${ChatHeaderComponent.id}">
          </div><h1 class='empty-chat'>Сообщений пока нет</h1>
        `;
      } else {
        return `<h1 class='empty-chat'>Выберите чат</h1>`;
      }
    }

    return `
    <div data-id="${ChatHeaderComponent.id}"></div>
    
    <div class='messages-wrapper'>
      <div class='messages-container'>
        ${messageComponents
          .map((_, index) => `<div data-id="${messageComponents[index].id}"></div>`)
          .join('')}
      </div>
    </div>
    `;
  }
}

const mapStateToProps = (state: StoreProps) => {
  return {
    messages: state.messages,
    chatHeader: state.chatHeader,
    selectedChat: state.selectedChat,
  };
};

export default connect(mapStateToProps)(Chat);
