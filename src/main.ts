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
  profileEdit: [
    Pages.ProfileEditPage,
    {
      editFields: [
        {
          label: 'Почта',
          inputType: 'email',
          inputValue: 'pochta@yandex.ru',
          name: 'email',
        },
        {
          label: 'Логин',
          inputType: 'text',
          inputValue: 'ivanivanov',
          name: 'login',
        },
        {
          label: 'Имя',
          inputType: 'text',
          inputValue: 'Иван',
          name: 'first_name',
        },
        {
          label: 'Фамилия',
          inputType: 'text',
          inputValue: 'Иванов',
          name: 'second_name',
        },
        {
          label: 'Имя в чате',
          inputType: 'text',
          inputValue: 'Иван',
          name: 'display_name',
        },
        {
          label: 'Телефон',
          inputType: 'tel',
          inputValue: '+7 (909) 967 30 30',
          name: 'phone',
        },
      ],
      primaryButtonText: 'Сохранить',
    },
  ],
  profileEditPassword: [
    Pages.ProfileEditPage,
    {
      editFields: [
        {
          label: 'Старый пароль',
          inputType: 'password',
          inputValue: 'oldPassword',
          name: 'password_old',
        },
        {
          label: 'Пароль',
          inputType: 'password',
          inputValue: 'password-new-222',
          name: 'newPassword',
        },
        {
          label: 'Пароль (ещё раз)',
          inputType: 'password',
          inputValue: 'password-new-222',
          name: 'newPasswordRepeat',
        },
      ],
      primaryButtonText: 'Сохранить',
    },
  ],
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
