import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";

const pages = {
  login: [
    Pages.LoginPage,
    {
      fields: [
        {
          label: "Логин",
          inputType: "text",
          inputValue: "ivanivanov",
          name: "login",
        },
        {
          label: "Пароль",
          inputType: "password",
          inputValue: "password",
          name: "password",
        },
      ],
    },
  ],
  registration: [
    Pages.RegistrationPage,
    {
      fields: [
        {
          label: "Почта",
          inputType: "email",
          inputValue: "pochta@yandex.ru",
          name: "email",
        },
        {
          label: "Логин",
          inputType: "text",
          inputValue: "ivanivanov",
          name: "login",
        },
        {
          label: "Имя",
          inputType: "text",
          inputValue: "Иван",
          name: "first_name",
        },
        {
          label: "Фамилия",
          inputType: "text",
          inputValue: "Иванов",
          name: "second_name",
        },
        {
          label: "Телефон",
          inputType: "tel",
          inputValue: "+7 (909) 967 30 30",
          name: "phone",
        },
        {
          label: "Пароль",
          inputType: "password",
          inputValue: "password",
          invalid: true,
          name: "password",
        },
        {
          label: "Пароль (ещё раз)",
          inputType: "password",
          inputValue: "password1",
          invalid: true,
          showError: true,
          errorMessage: "Пароли не совпадают",
          name: "password_repeat",
        },
      ],
    },
  ],
  main: [Pages.MainPage],
  profile: [
    Pages.ProfilePage,
    {
      infoRows: [
        {
          label: "Почта",
          value: "pochta@yandex.ru",
        },
        {
          label: "Логин",
          value: "ivanivanov",
        },
        {
          label: "Имя",
          value: "Иван",
        },
        {
          label: "Фамилия",
          value: "Иванов",
        },
        {
          label: "Имя в чате",
          value: "Иван",
        },
        {
          label: "Телефон",
          value: "+7 (909) 967 30 30",
        },
      ],
      profileName: "Иван",
    },
  ],
  "404": [Pages.Page404],
  "500": [Pages.Page500],
  nav: [Pages.NavigatePage],
};

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;

  const templatingFunction = Handlebars.compile(source);
  container.innerHTML = templatingFunction(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("nav"));

document.addEventListener("click", (e) => {
  // @ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
