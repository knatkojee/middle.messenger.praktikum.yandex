import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";

import cat1 from "./assets/img_1.jpeg";
import cat2 from "./assets/img_1.jpeg";
import cat3 from "./assets/img_1.jpeg";

const pages = {
  login: [Pages.LoginPage],
  list: [
    Pages.ListPage,
    {
      cats: [
        { name: "cat-1", avatar: cat1 },
        { name: "cat-2", avatar: cat2, active: true },
        { name: "cat-3", avatar: cat3 },
      ],
      showDialog: true,
    },
  ],
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
  console.log("html", templatingFunction(context));
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
