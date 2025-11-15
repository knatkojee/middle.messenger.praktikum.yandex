import AuthApi from '../api/auth';
import { ROUTER } from '../constants';

const authApi = new AuthApi();

export const login = async model => {
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
    window.router.go(ROUTER.chats);
  } catch (responsError) {
    const error = await responsError.json();
    window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};

export const register = async model => {
  window.store.set({ isLoading: true });
  try {
    await authApi.create(model);
    window.router.go(ROUTER.login);
  } catch (responsError) {
    const error = await responsError.json();
    window.store.set({ loginError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};
