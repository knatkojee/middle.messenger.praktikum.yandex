import Block from '../../core/block';
import type { StoreProps } from '../../core/Store';
import { connect } from '../../utils/connect';

export type MessageProps = {
  isIncoming?: boolean;
  text: string;
  time: string;
};

class Message extends Block {
  constructor(props: MessageProps) {
    console.log('alo');

    super('div', {
      className: 'message-container',
      isIncoming: props.isIncoming,
      text: props.text,
      time: props.time,
    });
  }

  render(): string {
    return `
        <div class='message {{#if isIncoming}}incoming-message{{else}}outgoing-message{{/if}}'>
            <p class='message-text'>{{ text }}</p>
            <div class='message-timestamp'>{{ time }}</div>
        </div>
    `;
  }
}

const mapStateToProps = (state: StoreProps): StoreProps => {
  return {
    ...window.store,
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(Message);
