import { createCustomerTable } from "../services/customer.js";
import { createSaleTable } from "../services/sale.js";
import { fillCustomerForm, fillSaleForm, fillSelect } from "../helper.js";
import { createDashboard } from "../services/dashboard.js";

export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle(routeName, updateRouteName) {
    let route;
    const { pathname } = window.location;

    routeName
      ? (route = routeName)
      : (route = this.routes[pathname] || this.routes[404]);

    if (routeName) {
      window.history.pushState(
        {},
        "",
        routeName.replace("/pages", "").replace(".html", "")
      );
    }

    if (updateRouteName) window.history.pushState({}, "", updateRouteName);

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        let element =
          route === "/pages/home.html" ||
          route === "/pages/conectar-se.html" ||
          route === "/pages/criar-conta.html"
            ? "body"
            : ".main";
        document.querySelector(element).innerHTML = html;
      });

    if (route === "/pages/lista-de-vendas.html") createSaleTable();
    if (route === "/pages/lista-de-clientes.html") createCustomerTable();
    if (route === "/pages/adicionar-venda.html") fillSelect();
    if (route === "/pages/dashboard.html") createDashboard();
    if (routeName === "/pages/adicionar-cliente.html") fillCustomerForm();
    if (routeName === "/pages/adicionar-venda.html") fillSaleForm();
  }
}
