import { createCustomerTable } from "../services/customer.js";
import { createSaleTable } from "../services/sale.js";

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

  handle(routeName) {
    let route;
    const { pathname } = window.location;

    routeName
      ? (route = routeName)
      : (route = this.routes[pathname] || this.routes[404]);

    if (routeName) {
      window.history.pushState({}, "", routeName
        .replace("/pages", "")
        .replace(".html", "")
      );
    }

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector(".main").innerHTML = html;
      });

    if (route === "/pages/lista-de-vendas.html") createSaleTable();
    if (route === "/pages/lista-de-clientes.html") createCustomerTable();
  }
}
