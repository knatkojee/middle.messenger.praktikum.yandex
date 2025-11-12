import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Router from './core/router';
import { ROUTER } from './constants';
import { Store, StoreEvents } from './core/Store';

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

window.store = new Store({
  isLoading: false,
  user: {},
  chats: [],
  selectedChat: 1,
  messages: [],
  chatHeader: {
    title: '',
    pic: '',
  },
  apiError: null,
});

window.store.on(StoreEvents.Updated, (prevState, newState) => {
  // console.log('prevState', prevState);
  // console.log('newState', newState);
});

// authServices.checkLoginUser();

const APP_ROOT_ELEMNT = '#app';

window.router = new Router(APP_ROOT_ELEMNT);
window.router
  .use(ROUTER.home, Pages.LoginPage)
  .use(ROUTER.login, Pages.LoginPage)
  .use(ROUTER.registration, Pages.RegistrationPage)
  .use(ROUTER.chats, Pages.ChatsPage)
  .use(ROUTER.profile, Pages.ProfilePage)
  .use('*', Pages.Page404)
  .start();
