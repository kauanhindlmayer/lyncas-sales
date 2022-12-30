import { config } from "../config.js";
import { user } from "./jwt.service.js";

export const api = {
  async get(resource) {
    const response = await fetch(`${config.baseURL}/${resource}/listar`, {
      method: "GET",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return await response.json();
  },

  async getById(resource, id) {
    const response = await fetch(`${config.baseURL}/${resource}/obter/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return await response.json();
  },

  async post(resource, body) {
    const response = await fetch(`${config.baseURL}/${resource}/adicionar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },

  async put(resource, body) {
    const response = await fetch(`${config.baseURL}/${resource}/atualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },

  async delete(resource, id) {
    const response = await fetch(
      `${config.baseURL}/${resource}/remover/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    return await response.json();
  },

  async createUser(body) {
    const response = await fetch(`${config.baseURL}/User/adicionar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await response.json();
  },

  async authenticateUser(body) {
    const response = await fetch(`${config.baseURL}/User/autenticar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },

  // async validateToken() {
  //   const response = await fetch(`${config.baseURL}/User/validar`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${user.token}` },
  //   });
  //   if (response.status !== 200) handleExpiredToken();
  // },
};
