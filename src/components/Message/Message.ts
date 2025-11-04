import Block from '../../core/block';

export type MessageProps = {
  isIncoming?: boolean;
  text: string;
  time: string;
};

export default class Message extends Block {
  constructor(props: MessageProps) {
    super('div', {
      className: 'message-container',
      isIncoming: props.isIncoming,
      text: props.text,
      time: props.time,
    });
  }

  render(): string {
    return `
    <div class='message-container'>
        <div class='message {{#if isIncoming}}incoming-message{{else}}outgoing-message{{/if}}'>
            <p class='message-text'>{{ text }}</p>
            <div class='message-timestamp'>{{ time }}</div>
        </div>
    </div>
    `;
  }
}
