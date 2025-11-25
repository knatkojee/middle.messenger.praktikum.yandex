import type { ChatUserResponse, UserDTO } from '../api/type';
import type { MessageProps } from '../components/Message/Message';
import EventBus from './eventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

export type StoreProps = {
  isLoading?: false;
  user?: UserDTO;
  chats?: [];
  selectedChat?: number;
  selectedChatUsers?: ChatUserResponse[];
  messages?: MessageProps[];
  chatHeader?: {
    title: string;
    pic?: string;
  };
  apiRequestError?: null;
  inputModal?: {
    isOpen: boolean;
    text: string;
    onSubmit: (data: SubmitEvent) => void;
  };
};

export class Store extends EventBus<StoreEvents> {
  private state: StoreProps = {};
  static __instance: Store;

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

  public set(nextState: StoreProps) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
