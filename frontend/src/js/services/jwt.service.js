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

    const response = await api.authenticateUser(body);

    if (response.token) {
      user.token = response.token;
      user.name = response.userName;

      localStorage.setItem("lyncas-sales-token", response.token);
      localStorage.setItem("lyncas-sales-username", response.userName);

      router.handle("/pages/home.html");
    } else {
      alert(response.notifications[0].message + ".");
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

    const response = await api.createUser(body);

    router.handle("/pages/conectar-se.html");

    alert(response.data.message);
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
