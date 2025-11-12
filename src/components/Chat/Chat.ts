import Block from '../../core/block';
import { connect } from '../../utils/connect';
import type { MessageProps } from '../Message/Message';
import Message from '../Message/Message';

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
    console.log('Chat render with messages:', this.props.messages);

    const messageComponents = (this.props.messages || []).map(
      message =>
        new Message({
          text: message.text,
          isIncoming: message.isIncoming,
          time: message.time,
        })
    );

    console.log(messageComponents);

    return `
      <div class='messages-container'>
        ${messageComponents.length > 0 ? messageComponents.map(() => '{{{this}}}').join('') : '<h1 class="empty-chat">Выберите чат</h1>'}
      </div>
    `;
  }
}
const mapStateToProps = (state: StoreProps) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Chat);
