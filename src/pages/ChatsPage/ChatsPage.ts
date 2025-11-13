import { Chat, ChatInputForm, Sidebar } from '../../components';
import type { ChatListItemProps } from '../../components/ChatListItem/ChatListItem';
import type { MessageProps } from '../../components/Message/Message';
import Block from '../../core/block';
import type { StoreProps } from '../../core/Store';
import { connect } from '../../utils/connect';
import { withRouter } from '../../utils/withRouter';
import template from './ChatPage.hbs?raw';
import templateWithNoChat from './ChatPageWithNoChat.hbs?raw';
type ChatsPageProps = {
  messages?: MessageProps[];
};

const messages1: MessageProps[] = [
  {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati molestias, non laborum facere ducimus soluta saepe in minima praesentium. Accusamus fugiat dolorem',
    isIncoming: true,
    time: '11:26',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, in a? Quos pariatur accusamus eius reiciendis autem quod, esse animi nisi eligendi quo temporibus laudantium soluta ducimus necessitatibus labore veritatis?',
    time: '11:27',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat vitae placeat libero voluptatem tempore officiis, excepturi aspernatur voluptates reiciendis sapiente explicabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
    isIncoming: true,
    time: '11:28',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur, explicabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
    time: '11:29',
  },
  {
    text: 'velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
    isIncoming: true,
    time: '11:30',
  },
  {
    text: 'icabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
    time: '11:30',
  },
];

const messages2: MessageProps[] = [
  {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati molestias, non laborum facere ducimus soluta saepe in minima praesentium. Accusamus fugiat dolorem',
    isIncoming: true,
    time: '11:26',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, in a? Quos pariatur accusamus eius reiciendis autem quod, esse animi nisi eligendi quo temporibus laudantium soluta ducimus necessitatibus labore veritatis?',
    time: '11:27',
  },
];

const messages3: MessageProps[] = [
  {
    text: 'Lorem ipsum dolor sit amet consectetur, explicabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
    time: '11:29',
  },
  {
    text: 'velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
    isIncoming: true,
    time: '11:30',
  },
  {
    text: 'icabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
    time: '11:30',
  },
];

class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    const chatsList: ChatListItemProps[] = [
      {
        name: 'Андрей',
        time: '10:32',
        text: 'Шалом',
        unread: 3,
        onChatClick: () => {
          window.store.set({
            messages: messages1,
            chatHeader: {
              title: 'Андрей',
            },
          });
        },
      },
      {
        name: 'Иван',
        time: '11:02',
        text: 'Хало',
        unread: 1,
        onChatClick: () => {
          window.store.set({
            messages: messages2,
            chatHeader: {
              title: 'Иван',
            },
          });
        },
      },
      {
        name: 'Семён',
        time: '00:19',
        text: 'Доброй ночи',
        onChatClick: () => {
          window.store.set({
            messages: messages3,
            chatHeader: {
              title: 'Семён',
            },
          });
        },
      },
    ];

    super('main', {
      ...props,
      className: 'chat-container',
      Sidebar: new Sidebar({
        chatsList,
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

            const input = this._element?.querySelector('input') as HTMLInputElement;
            if (input) {
              input.value = '';
            }
          }
        },
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
