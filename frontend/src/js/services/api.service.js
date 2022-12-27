import { config } from "../config.js";
import { user } from "./jwt.service.js";

export const api = {
  get(resource) {
    return fetch(`${config.baseURL}/${resource}/listar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then((response) => response.json());
  },

  getById(resource, id) {
    return fetch(`${config.baseURL}/${resource}/obter/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then((response) => response.json());
  },

  post(resource, body) {
    return fetch(`${config.baseURL}/${resource}/adicionar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },

  put(resource, body) {
    return fetch(`${config.baseURL}/${resource}/atualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },

  delete(resource, id) {
    return fetch(`${config.baseURL}/${resource}/remover/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }).then((response) => response.json());
  },

  authenticate(body) {
    return fetch(`${config.baseURL}/User/autenticar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
};
