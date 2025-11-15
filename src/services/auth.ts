import AuthApi from '../api/auth';
import { DEFAULT_ERROR_MESSAGE, ROUTER } from '../constants';
import type { HTTPError } from '../core/httpTransport';
import type { LoginData, RegisterData } from '../types';

const authApi = new AuthApi();

export const login = async (model: LoginData) => {
  window.store.set({ isLoading: true });

  try {
    await authApi.login(model);
    window.router.go(ROUTER.chats);
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

export const register = async (model: RegisterData) => {
  window.store.set({ isLoading: true });

  try {
    await authApi.create(model);
    window.router.go(ROUTER.login);
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
