import Block from '../../core/block';
import type { StoreProps } from '../../core/store';
import { connect } from '../../utils/connect';
import ChatHeaderClass from '../ChatHeader/ChatHeader';
import type { ChatHeaderProps } from '../ChatHeader/ChatHeader';
import Message from '../Message/Message';
import type { MessageProps } from '../Message/Message';
import * as chatsApi from '../../services/chats';
import { openWebsocket, type WebSocketObject } from '../../services/websocket';
import { toTimeFormat } from '../../utils/utils';

type ChatProps = {
  messages?: MessageProps[];
  chatHeader?: {
    title: string;
    pic: string;
  };
  selectedChat: number;
  className?: string;
};

class Chat extends Block<ChatProps> {
  constructor(props: ChatProps = {} as ChatProps) {
    super('div', {
      ...props,
      className: 'chat-wrapper',
    });
  }

  private selectedChat: number | undefined = undefined;
  public socket: WebSocketObject | undefined = undefined;

  private updateWebsocket(chatId: string) {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    }

    openWebsocket({
      chatId,
      onMessageReceive: messages => {
        const mappedMessages: MessageProps[] = messages.reverse().map(el => {
          return {
            text: el.content,
            time: toTimeFormat(el.time),
            isIncoming: el.user_id !== window.store.state.user.id,
          };
        });

        this.setProps({
          messages: (this.props.messages || []).concat(mappedMessages),
          selectedChat: this.props.selectedChat
        });
      },
      userId: window.store.state.user.id,
    }).then(socket => {
      this.socket = socket;
    });
  }

  async getChatUsers(selectedChat: number) {
    await chatsApi.getChatUsers(selectedChat);
  }

  render(): string {
    if (this.selectedChat !== this.props.selectedChat) {
      this.selectedChat = this.props.selectedChat;
      this.updateWebsocket(this.selectedChat?.toString());
    }

    const ChatHeaderComponent = new ChatHeaderClass({
      title: (window.store.state.chatHeader as ChatHeaderProps).title,
      pic: (this.props.chatHeader as ChatHeaderProps).pic,
      members: window.store.state.selectedChatUsers?.length,
    });

    this.children.chatHeader = ChatHeaderComponent as unknown as Block;

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
