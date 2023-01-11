import { api } from "./api.service.js";
import { router } from "../router/router.js";
import { validator, removeUserData } from "../helper.js";

export const user = {
  token: localStorage.getItem("lyncas-sales-token"),
  name: localStorage.getItem("lyncas-sales-username"),
};

window.handleLogin = async () => {
  if (validator.validateFields()) {
    const body = {
      login: document.querySelector("#input-email").value,
      password: document.querySelector("#input-password").value,
    };

    let response = null;

    try {
      response = await api.authenticateUser(body);

      if (!response.token) throw "Error";

      user.token = response.token;
      user.name = response.userName;

      localStorage.setItem("lyncas-sales-token", response.token);
      localStorage.setItem("lyncas-sales-username", response.userName);

      router.handle("/pages/home.html");
    } catch (error) {
      alert(response.notifications[0].message);
      return;
    }
  }
};

window.handleCreateUser = async () => {
  if (validator.validateFields()) {
    const body = {
      name: document.querySelector("#input-name").value,
      login: document.querySelector("#input-email").value,
      password: document.querySelector("#input-password").value,
      passwordConfirmation: document.querySelector("#input-confirm-password")
        .value,
    };

    let response;

    try {
      response = await api.createUser(body);

      if (!response.success) throw "Error";

      router.handle("/pages/conectar-se.html");

      alert(response.data.message);
    } catch (error) {
      alert(response.notifications[0].message);
    }
  }
};

window.handleLogout = () => {
  const answer = confirm("Deseja realmente sair do sistema?");

  if (answer) {
    removeUserData();
    router.handle("/pages/conectar-se.html");
  }
};

export const handleExpiredToken = () => {
  alert("Sua sessão expirou.");

  removeUserData();

  router.handle("/pages/conectar-se.html");
};
