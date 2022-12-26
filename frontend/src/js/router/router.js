import { createDashboard } from "../services/dashboard.service.js";
import { createCustomerTable } from "../services/customer.service.js";
import { createSaleTable } from "../services/sale.service.js";
import { fillSelect, disableMenu, enableMenu } from "../helper.js";

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
      const href = routeName.replace("/pages", "").replace(".html", "");
      window.history.pushState({}, "", href);
    }

    if (updateRouteName) window.history.pushState({}, "", updateRouteName);

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;

        route !== "/pages/conectar-se.html" &&
        route !== "/pages/criar-conta.html"
          ? enableMenu()
          : disableMenu();
      });

    if (pathname === "/dashboard") createDashboard();
    if (pathname === "/lista-de-clientes") createCustomerTable();
    if (pathname === "/lista-de-vendas") createSaleTable();
    if (pathname === "/adicionar-venda") fillSelect();
  },
};
