import Block from '../../core/block';
import type { StoreProps } from '../../core/Store';
import { connect } from '../../utils/connect';
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

  render(): string {
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
      <div class='messages-container'>
        ${messageComponents
          .map((_, index) => `<div data-id="${messageComponents[index].id}"></div>`)
          .join('')}
      </div>
    `;
  }
}

const mapStateToProps = (state: StoreProps) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Chat);
