import type { MessageProps } from '../components/Message/Message';
import EventBus from './eventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

export type StoreProps = {
  isLoading: false;
  user: object;
  chats: [];
  selectedChat: 1;
  messages: MessageProps[];
  apiError: null;
};

export class Store extends EventBus<StoreEvents> {
  private state: StoreProps = {};

  constructor(defaultState: StoreProps) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
