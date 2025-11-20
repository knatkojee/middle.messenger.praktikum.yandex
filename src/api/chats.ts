import { HOST } from '../constants';
import { HTTPTransport, type GetOptions } from '../core/httpTransport';
import type {
  ChatsResponse,
  ChatUserResponse,
  CreateChatRequest,
  CreateChatResponse,
  UsersRequest,
} from './type';

const chatsApi = new HTTPTransport(`${HOST}/chats`);

export default class ChatsApi {
  async getChats(
    options: GetOptions = {
      data: {
        offset: 0,
        limit: 20,
      },
    }
  ) {
    return chatsApi.get<ChatsResponse>('', options);
  }

  async postCreateChat(data: CreateChatRequest) {
    return chatsApi.post<CreateChatResponse>('', data);
  }

  async putChatUsers(data: UsersRequest) {
    return chatsApi.put<string>('/users', data);
  }

  async deleteChatUsers(data: UsersRequest) {
    return chatsApi.delete<string>('/users', data);
  }

  async getChatUsers(
    id: number,
    options: GetOptions = {
      data: {
        offset: 0,
        limit: 20,
      },
    }
  ) {
    return chatsApi.get<ChatUserResponse>(`/${id}/users`, options);
  }
}
