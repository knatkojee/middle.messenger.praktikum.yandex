import { MessageField } from '../../components';
import type { MessageProps } from '../../components/Message/Message';
import Message from '../../components/Message/Message';
import Block from '../../core/block';
import template from './MainPage.hbs?raw';

type MainPageProps = {
  messages: MessageProps[];
};

export default class MainPage extends Block {
  constructor(props: MainPageProps) {
    super('main', {
      ...props,
      className: 'chat-container',
      Input: new MessageField({
        onBlur: e => {
          const val = (e.target as HTMLInputElement)?.value;

          let error = '';
          let isInvalid = false;

          if (!val) {
            error = 'Нельзя отправить пустое сообщение';
            isInvalid = true;
          }
          console.log(this);

          this.setProps({
            isInvalid,
            errorMessage: error,
          });
        },
      }),
      messages: [
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
      ].map(
        el =>
          new Message({
            text: el.text,
            isIncoming: el.isIncoming,
            time: el.time,
          })
      ),
    });
  }

  public render(): string {
    return template;
  }
}
