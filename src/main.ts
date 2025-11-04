import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';
import renderDOM from './core/renderDom';

const pages = {
  login: [Pages.LoginPage],
  registration: [Pages.RegistrationPage],
  main: [Pages.MainPage],
  profile: [Pages.ProfilePage],
  profileEdit: [Pages.ProfileEditPage],
  profileEditPassword: [Pages.ProfileEditPasswordPage],
  '404': [Pages.Page404],
  '500': [Pages.Page500],
  modalPage: [Pages.PageWithModal],
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

  const templatingFunction = Handlebars.compile(source);
  container.innerHTML = templatingFunction(context);
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
