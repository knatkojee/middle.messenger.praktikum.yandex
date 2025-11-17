import { Chat, ChatInputForm, Sidebar } from '../../components';
import type { ChatListItemProps } from '../../components/ChatListItem/ChatListItem';
import type { MessageProps } from '../../components/Message/Message';
import Block from '../../core/block';
import type { StoreProps } from '../../core/Store';
import { connect } from '../../utils/connect';
import { withRouter } from '../../utils/withRouter';
import template from './ChatPage.hbs?raw';
import * as chatsApi from '../../services/chats';
import templateWithNoChat from './ChatPageWithNoChat.hbs?raw';
import type { ChatResponse } from '../../api/type';
type ChatsPageProps = {
  messages?: MessageProps[];
  chatsList: ChatListItemProps[];
};

class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super('main', {
      ...props,
      className: 'chat-container',
      Sidebar: new Sidebar({
        chatsList: props.chatsList ?? [],
      }),
      Chat: new Chat({}),
      ChatInputForm: new ChatInputForm({
        onSubmit: e => {
          e.preventDefault();

          if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const now = new Date();
            const newMessages = [...window.store.state.messages];

            newMessages.push({
              text: data.message,
              time: `${now.getHours()}:${now.getMinutes()}`,
            });

            window.store.set({
              messages: newMessages,
            });

            e.target.reset();

            this._element?.querySelector('input')?.focus();
          }
        },
      }),
    });

    this.getChats();
  }

  async getChats() {
    await chatsApi.getChats();

    console.log(window.store.state);

    this.setProps({
      chatsList: window.store.state?.chats?.map((el: ChatResponse): ChatListItemProps => {
        return {
          name: el.title,
          onChatClick: () => {
            window.store.set({
              messages: [],
              chatHeader: {
                title: 'Андрей',
              },
            });
          },
          time: el.last_message?.time,
          pic: el.avatar,
          text: el.last_message?.content,
          unread: el.unread_count,
        };
      }),
    });
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
