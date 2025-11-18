import Block from '../../core/block';
import { OptionsButton } from '../OptionsButton';

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
      OptionsButton: new OptionsButton({}),
    });
  }

  render(): string {
    return `
        <div class='active-user-info'>
          <div class='active-user-avatar'></div>
          <h2 class='active-user-name'>{{ title }}</h2>
        </div>
        <div class='header-button-wrapper'>
          {{{ OptionsButton }}}
        </div>
        `;
  }
}

export default ChatHeader;
