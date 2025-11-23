import { ChatInputForm, Sidebar } from '../../components';
import ChatClass from '../../components/Chat/Chat';
import type { ChatListItemProps } from '../../components/ChatListItem/ChatListItem';
import type { MessageProps } from '../../components/Message/Message';
import Block from '../../core/block';
import type { StoreProps } from '../../core/store';
import { connect } from '../../utils/connect';
import { withRouter } from '../../utils/withRouter';
import template from './ChatPage.hbs?raw';
import templateWithNoChat from './ChatPageWithNoChat.hbs?raw';
import * as authApi from '../../services/auth';

type ChatsPageProps = {
  messages?: MessageProps[];
  chatsList: ChatListItemProps[];
};

class ChatsPage extends Block {
  private chatInstance: InstanceType<typeof ChatClass>;

  constructor(props: ChatsPageProps) {
    const chatInstance = new ChatClass({});

    super('main', {
      ...props,
      className: 'chat-container',
      Sidebar: new Sidebar({
        chatsList: props.chatsList ?? [],
      }),
      Chat: chatInstance,
      ChatInputForm: new ChatInputForm({
        onSubmit: e => {
          e.preventDefault();

          if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            this.chatInstance.socket?.sendMessage(data.message);

            e.target.reset();

            this._element?.querySelector('input')?.focus();
          }
        },
      }),
    });

    this.chatInstance = chatInstance;
    this.setUserData();
  }

  async setUserData() {
    await authApi.me();
  }

  public render(): string {
    if (!this.props.messages) {
      return templateWithNoChat;
    }

    return template;
  }
}

const mapStateToProps = (state: StoreProps) => {
  return {
    messages: state.messages,
    chatHeader: state.chatHeader,
  };
};

export default connect(mapStateToProps)(withRouter(ChatsPage));
