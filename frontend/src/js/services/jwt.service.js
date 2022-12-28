import { api } from "./api.service.js";
import { router } from "../router/router.js";
import { validator } from "../helper.js";

export const user = {
  token: localStorage.getItem("lyncas-sales-token"),
  name: localStorage.getItem("lyncas-sales-username"),
};

const handleLogin = async () => {
  if (validator.validateFields()) {
    const body = {
      login: document.querySelector("#input-email").value,
      password: document.querySelector("#input-password").value,
    };

    const response = await api.authenticate(body);

    user.token = response.token;
    user.name = response.userName;

    localStorage.setItem("lyncas-sales-token", response.token);
    localStorage.setItem("lyncas-sales-username", response.userName);

    router.handle("/pages/home.html");
  }
};

window.handleLogin = () => handleLogin();

const handleCreateUser = async () => {
  if (validator.validateFields()) {
    const body = {
      name: document.querySelector("#input-name").value,
      login: document.querySelector("#input-email").value,
      password: document.querySelector("#input-password").value,
      passwordConfirmation: document.querySelector("#input-confirm-password")
        .value,
    };

    const response = await api.post("User", body);

    router.handle("/pages/conectar-se.html");

    alert(response.data.message);
  }
};

window.handleCreateUser = () => handleCreateUser();

const handleLogout = () => {
  const answer = confirm("Deseja realmente sair do sistema?");

  if (answer) {
    localStorage.removeItem("lyncas-sales-token");
    localStorage.removeItem("lyncas-sales-username");

    router.handle("/pages/conectar-se.html");
  }
};

window.handleLogout = () => handleLogout();

const isTokenValid = async () => {
  const response = await api.validate();
  return response === 200 ? true : false;
};

window.isTokenValid = () => isTokenValid();
