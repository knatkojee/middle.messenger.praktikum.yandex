import Block from '../../core/block';
import type { StoreProps } from '../../core/Store';
import { connect } from '../../utils/connect';
import { ChatHeader } from '../ChatHeader';
import Message from '../Message/Message';
import type { MessageProps } from '../Message/Message';

type ChatProps = {
  messages?: MessageProps[];
};

class Chat extends Block {
  constructor(props: ChatProps) {
    super('div', {
      ...props,
      className: 'messages-wrapper',
    });
  }

  // TODO вынести шапку
  render(): string {
    const ChatHeaderComponent = new ChatHeader({
      title: this.props.chatHeader.title,
      pic: this.props.chatHeader.pic,
    });

    this.children.chatHeader = ChatHeaderComponent;

    const messageComponents = ((this.props.messages || []) as MessageProps[]).map(
      message =>
        new Message({
          text: message.text,
          isIncoming: message.isIncoming,
          time: message.time,
        })
    ) as Message[];

    this.children.messages = messageComponents;

    if (messageComponents.length === 0) {
      return `<h1 class='empty-chat'>Выберите чат</h1>`;
    }

    return `
      <div data-id="${ChatHeaderComponent.id}"></div>
      <div class='messages-container'>
        ${messageComponents
          .map((_, index) => `<div data-id="${messageComponents[index].id}"></div>`)
          .join('')}
      </div>
    `;
  }
}

const mapStateToProps = (state: StoreProps) => {
  console.log(state);

  return {
    messages: state.messages,
    chatHeader: state.chatHeader,
  };
};

export default connect(mapStateToProps)(Chat);
