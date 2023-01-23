import { api } from "./api.service.js";
import { router } from "../router/router.js";
import { validator, alertError } from "../helper.js";
import * as storage from "./jwt.service.js";

export const user = {
  token: storage.getToken(),
  name: storage.getUsername(),
};

window.handleLogin = async () => {
  if (validator.validateFields()) {
    const body = {
      login: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };

    const response = await api.post("User/autenticar", body);

    if (!response.token) {
      alertError(response);
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
      name: document.querySelector("#name").value,
      login: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      passwordConfirmation: document.querySelector("#confirm-password").value,
    };

    const response = await api.post("User/adicionar", body);

    if (!response.success) {
      alertError(response);
      return;
    }

    router.handle("/pages/conectar-se.html");

    alert(response.data.message);
  }
};

window.handleSubmitOnEnter = (event) => {
  if (event.key === "Enter") document.querySelector("button").click();
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
