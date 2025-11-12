import { Chat, MessageField, Sidebar } from '../../components';
import type { ChatListItemProps } from '../../components/ChatListItem/ChatListItem';
import type { MessageProps } from '../../components/Message/Message';
import Block from '../../core/block';
import type { StoreProps } from '../../core/Store';
import { connect } from '../../utils/connect';
import { withRouter } from '../../utils/withRouter';
import template from './ChatPage.hbs?raw';

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
      Input: new MessageField({
        onBlur: e => {
          const val = (e.target as HTMLInputElement)?.value;

          let error = '';
          let isInvalid = false;

          if (!val) {
            error = 'Нельзя отправить пустое сообщение';
            isInvalid = true;
          }
          console.log(val);

          this.setProps({
            isInvalid,
            errorMessage: error,
          });
        },
      }),
      Chat: new Chat({}),
    });
  }

  public render(): string {
    return template;
  }
}
const mapStateToProps = (state: StoreProps) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(withRouter(ChatsPage));
