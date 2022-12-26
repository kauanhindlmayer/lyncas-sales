import { createDashboard } from "../services/dashboard.service.js";
import { createCustomerTable } from "../services/customer.service.js";
import { createSaleTable } from "../services/sale.service.js";
import { fillSelect } from "../helper.js";

export const router = {
  routes: {},

  add(routeName, page) {
    this.routes[routeName] = page;
  },

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  },

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
        document.querySelector("#app").innerHTML = html;
      });

    if (route === "/pages/dashboard.html") createDashboard();
    if (route === "/pages/lista-de-clientes.html") createCustomerTable();
    if (route === "/pages/lista-de-vendas.html") createSaleTable();
    if (route === "/pages/adicionar-venda.html") fillSelect();
  },
}