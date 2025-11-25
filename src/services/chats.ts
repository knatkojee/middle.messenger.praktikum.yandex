import ChatsApi from '../api/chats';
import type { ChatUpdateAvatarRequest, CreateChatRequest, UsersRequest } from '../api/type';
import { DEFAULT_ERROR_MESSAGE } from '../constants';
import type { GetOptions, HTTPError } from '../core/httpTransport';

const chatsApi = new ChatsApi();

export const getChats = async (options?: GetOptions) => {
  window.store.set({ isLoading: true });

  try {
    const chats = await chatsApi.getChats(options);
    window.store.set({
      chats: chats.data,
    });
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const postCreateChat = async (data: CreateChatRequest) => {
  window.store.set({ isLoading: true });

  try {
    await chatsApi.postCreateChat(data);
    window.store.set({
      inputModal: { isOpen: false },
    });
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const deleteChat = async (chatId: number) => {
  window.store.set({ isLoading: true });

  try {
    await chatsApi.deleteChat(chatId);
    window.store.set({
      inputModal: { isOpen: false },
    });
    window.location.reload();
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const putChatUsers = async (data: UsersRequest) => {
  window.store.set({ isLoading: true });

  try {
    await chatsApi.putChatUsers(data);
    window.store.set({
      inputModal: { isOpen: false },
    });
    window.location.reload();
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const deleteChatUsers = async (data: UsersRequest) => {
  window.store.set({ isLoading: true });

  try {
    await chatsApi.deleteChatUsers(data);
    window.store.set({
      inputModal: { isOpen: false },
    });
    window.location.reload();
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const getChatUsers = async (id: number) => {
  window.store.set({ isLoading: true });

  try {
    const response = await chatsApi.getChatUsers(id);
    window.store.set({
      selectedChatUsers: response.data,
    });
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const postUpdateChatAvatar = async (data: ChatUpdateAvatarRequest) => {
  window.store.set({ isLoading: true });

  try {
    await chatsApi.putUpdateChatAvatar(data);
    window.location.reload();
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }
  } finally {
    window.store.set({ isLoading: false });
  }
};
