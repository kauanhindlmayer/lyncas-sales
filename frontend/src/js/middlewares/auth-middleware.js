import { isAuthenticated } from "../helper.js";

export const authMiddleware = (route) => {
  if (
    route !== "/pages/conectar-se.html" &&
    route !== "/pages/criar-conta.html" &&
    !isAuthenticated()
  ) {
    route = "/pages/conectar-se.html";
  }
  return route;
};
