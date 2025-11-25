import type { UserUpdateAvatarRequest, UserUpdatePasswordRequest, UserUpdateRequest } from '../api/type';
import UserApi from '../api/user';
import { DEFAULT_ERROR_MESSAGE } from '../constants';
import type { HTTPError } from '../core/httpTransport';

const userApi = new UserApi();

export const changeUser = async (model: UserUpdateRequest) => {
  window.store.set({ isLoading: true });

  try {
    const userData = await userApi.changeUser(model);
    window.store.set({
      user: userData.data,
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

export const changeUserPassword = async (model: UserUpdatePasswordRequest) => {
  window.store.set({ isLoading: true });
  try {
    const userData = await userApi.changeUserPassword(model);
    window.store.set({
      user: userData.data,
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

export const changeUserAvatar = async (data: UserUpdateAvatarRequest) => {
  window.store.set({ isLoading: true });
  try {
    const userData = await userApi.changeUserAvatar(data);
    window.store.set({
      user: userData.data,
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
