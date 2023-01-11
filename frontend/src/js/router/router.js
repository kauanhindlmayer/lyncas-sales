import { loadComponents } from "../helper.js";
import { checkAuth } from "../middlewares/checkAuth.js";

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

    if (routeName) {
      route = checkAuth(routeName);
      const href = routeName.replace("/pages", "").replace(".html", "");
      window.history.pushState({}, "", href);
    } else {
      route = checkAuth(this.routes[pathname]) || this.routes[404];
    }

    if (updateRouteName) window.history.pushState({}, "", updateRouteName);

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
        loadComponents(route);
      });
  },
};
