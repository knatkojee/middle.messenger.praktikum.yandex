import AuthApi from '../api/auth';
import { DEFAULT_ERROR_MESSAGE, ROUTER } from '../constants';
import type { HTTPError } from '../core/httpTransport';
import type { LoginData, RegisterData } from '../types';

const authApi = new AuthApi();

export const login = async (model: LoginData) => {
  window.store.set({ isLoading: true });

  try {
    await authApi.login(model);
    const userData = await authApi.me();
    window.store.set({
      user: userData.data,
    });
    window.router.go(ROUTER.chats);
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      if (error.data.reason === 'User already in system') {
        window.router.go(ROUTER.chats);
      }
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

export const logout = async () => {
  window.store.set({ isLoading: true });

  try {
    await authApi.logout();
    window.store.set({
      user: {},
    });
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

export const me = async () => {
  window.store.set({ isLoading: true });

  try {
    const userData = await authApi.me();
    window.store.set({
      user: userData.data,
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

export const checkLoginUser = async () => {
  window.store.set({ isLoading: true });

  try {
    await authApi.me();
    if (window.location.href.endsWith(ROUTER.login)) {
      window.router.go(ROUTER.chats);
    }
  } catch (responseError: unknown) {
    const error = responseError as HTTPError;
    if (error.data?.reason) {
      window.store.set({ apiRequestError: error.data.reason });
    } else {
      window.store.set({ apiRequestError: error.message ?? DEFAULT_ERROR_MESSAGE });
    }

    window.router.go(ROUTER.login);
  } finally {
    window.store.set({ isLoading: false });
  }
};
