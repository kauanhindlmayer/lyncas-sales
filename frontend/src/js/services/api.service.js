import { config } from "../config.js";
import { user, handleExpiredToken } from "./jwt.service.js";

export const api = {
  async get(resource) {
    try {
      const response = await fetch(`${config.baseURL}/${resource}/listar`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return await response.json();
    } catch (error) {
      handleExpiredToken();
    }
  },

  async getById(resource, id) {
    try {
      const response = await fetch(
        `${config.baseURL}/${resource}/obter/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      return await response.json();
    } catch (error) {
      handleExpiredToken();
    }
  },

  async post(resource, body) {
    try {
      const response = await fetch(`${config.baseURL}/${resource}/adicionar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      handleExpiredToken();
    }
  },

  async put(resource, body) {
    try {
      const response = await fetch(`${config.baseURL}/${resource}/atualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      handleExpiredToken();
    }
  },

  async delete(resource, id) {
    try {
      const response = await fetch(
        `${config.baseURL}/${resource}/remover/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      return await response.json();
    } catch (error) {
      handleExpiredToken();
    }
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
};
