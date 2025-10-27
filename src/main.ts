import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';
import renderDOM from './core/renderDom';

const pages = {
  // login: [Pages.LoginPage],
  login: [Pages.LoginPage],
  registration: [Pages.RegistrationPage],
  main: [Pages.MainPage],
  profile: [
    Pages.ProfilePage,
    {
      infoRows: [
        {
          label: 'Почта',
          value: 'pochta@yandex.ru',
        },
        {
          label: 'Логин',
          value: 'ivanivanov',
        },
        {
          label: 'Имя',
          value: 'Иван',
        },
        {
          label: 'Фамилия',
          value: 'Иванов',
        },
        {
          label: 'Имя в чате',
          value: 'Иван',
        },
        {
          label: 'Телефон',
          value: '+7 (909) 967 30 30',
        },
      ],
      profileName: 'Иван',
    },
  ],
  profileEdit: [Pages.ProfileEditPage],
  profileEditPassword: [Pages.ProfileEditPasswordPage],
  '404': [Pages.Page404],
  '500': [Pages.Page500],
  modalPage: [
    Pages.PageWithModal,
    {
      showModal: true,
    },
  ],
  nav: [Pages.NavigatePage],
};
Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page];
  if (typeof source === 'function') {
    renderDOM(new source({}));
    return;
  }

  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
