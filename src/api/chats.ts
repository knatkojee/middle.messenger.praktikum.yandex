import { HOST } from '../constants';
import { HTTPTransport, type GetOptions } from '../core/httpTransport';
import type { ChatsResponse, CreateChatRequest, CreateChatResponse, UsersRequest } from './type';

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

  async putAddChatUsers(data: UsersRequest) {
    return chatsApi.put<string>('users', data);
  }

  async putDeleteChatUsers(data: UsersRequest) {
    return chatsApi.put<string>('users', data);
  }
}
