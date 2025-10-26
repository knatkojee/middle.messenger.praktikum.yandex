import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';
import renderDOM from './core/renderDom';

const pages = {
  // login: [Pages.LoginPage],
  login: [Pages.LoginPage],
  registration: [Pages.RegistrationPage],
  main: [
    Pages.MainPage,
    {
      messages: [
        {
          text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati molestias, non laborum facere ducimus soluta saepe in minima praesentium. Accusamus fugiat dolorem',
          incoming: true,
          time: '11:26',
        },
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, in a? Quos pariatur accusamus eius reiciendis autem quod, esse animi nisi eligendi quo temporibus laudantium soluta ducimus necessitatibus labore veritatis?',
          time: '11:27',
        },
        {
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat vitae placeat libero voluptatem tempore officiis, excepturi aspernatur voluptates reiciendis sapiente explicabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
          incoming: true,
          time: '11:28',
        },
        {
          text: 'Lorem ipsum dolor sit amet consectetur, explicabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
          time: '11:29',
        },
        {
          text: 'velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
          incoming: true,
          time: '11:30',
        },
        {
          text: 'icabo velit, assumenda quis molestiae numquam voluptas. Vel, odio aperiam?',
          time: '11:30',
        },
      ],
    },
  ],
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
