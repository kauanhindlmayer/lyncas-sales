import { api } from "./api.service.js";
import { router } from "../router/router.js";
import { validator } from "../helper.js";
import * as storage from "./jwt.service.js";

export const user = { token: storage.getToken(), name: storage.getUsername() };

window.handleLogin = async () => {
  if (validator.validateFields()) {
    const body = {
      login: document.querySelector("#input-email").value,
      password: document.querySelector("#input-password").value,
    };

    const response = await api.post("User/autenticar", body);

    if (!response.token) {
      alert(response.notifications[0].message);
      return;
    }

    user.token = response.token;
    user.name = response.userName;

    storage.setToken(response.token);
    storage.setUsername(response.userName);

    router.handle("/pages/home.html");
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

    const response = await api.post("User/adicionar", body);

    if (!response.success) {
      alert(response.notifications[0].message);
      return;
    }

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

const removeUserData = () => {
  storage.removeToken();
  storage.removeUsername();
  delete user.token;
  delete user.name;
};
