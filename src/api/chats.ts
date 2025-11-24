import { HOST } from '../constants';
import { HTTPTransport, type GetOptions } from '../core/httpTransport';
import type {
  ChatsResponse,
  ChatUpdateAvatarRequest,
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

  async deleteChat(chatId: number) {
    return chatsApi.delete<string>('', { chatId });
  }

  async putUpdateChatAvatar(data: ChatUpdateAvatarRequest) {
    const formData = new FormData();
    formData.append('avatar', data.avatar);
    formData.append('chatId', data.chatId.toString());
    return chatsApi.put<string>('/avatar', formData);
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
