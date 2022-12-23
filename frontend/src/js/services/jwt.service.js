import { api } from "./api.service.js";
import { Router } from "../router/router.js";

export const handleLogin = async () => {
  
}

window.handleLogin = () => handleLogin();

export const handleCreateUser = async () => {
  const body = {
    name: document.querySelector("#input-name").value,
    login: document.querySelector("#input-email").value,
    password: document.querySelector("#input-password").value,
    passwordConfirmation: document.querySelector("#input-confirm-password").value,
  };

  const response = await api.post("User", body);

  alert(response.data.message)

  const router = new Router();
  router.handle("/pages/conectar-se.html");
}

window.handleCreateUser = () => handleCreateUser();

