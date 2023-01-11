import { api } from "./api.service.js";
import { router } from "../router/router.js";
import { validator, removeUserData } from "../helper.js";
import { getToken, getUsername, setToken, setUsername } from "./jwt.service.js";

export const user = {
  token: getToken(),
  name: getUsername(),
};

window.user = user;

window.handleLogin = async () => {
  if (validator.validateFields()) {
    const body = {
      login: document.querySelector("#input-email").value,
      password: document.querySelector("#input-password").value,
    };

    let response;

    try {
      response = await api.post("User", body);

      if (!response.token) throw "Error";

      user.token = response.token;
      user.name = response.userName;

      setToken(response.token);
      setUsername(response.userName);

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
      response = await api.post("User", body);

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
