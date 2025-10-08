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
          errorClass: "",
          inputValue: "ivanivanov",
        },
        {
          label: "Пароль",
          inputType: "email",
          inputValue: "password",
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
          errorClass: "",
          inputValue: "pochta@yandex.ru",
        },
        {
          label: "Логин",
          inputType: "text",
          errorClass: "",
          inputValue: "ivanivanov",
        },
        {
          label: "Имя",
          inputType: "text",
          errorClass: "",
          inputValue: "Иван",
        },
        {
          label: "Фамилия",
          inputType: "text",
          errorClass: "",
          inputValue: "Иванов",
        },
        {
          label: "Телефон",
          inputType: "tel",
          errorClass: "",
          inputValue: "+7 (909) 967 30 30",
        },
        {
          label: "Пароль",
          inputType: "email",
          inputValue: "password",
          invalid: true,
        },
        {
          label: "Пароль (ещё раз)",
          inputType: "email",
          inputValue: "password1",
          invalid: true,
          showError: true,
          errorMessage: "Пароли не совпадают",
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
  console.log(page);

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
