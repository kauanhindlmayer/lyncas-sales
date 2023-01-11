import { isAuthenticated } from "../helper.js";

export const checkAuth = (route) => {
  if (
    route !== "/pages/conectar-se.html" &&
    route !== "/pages/criar-conta.html" &&
    !isAuthenticated()
  ) {
    route = "/pages/conectar-se.html";
  }
  return route;
};
