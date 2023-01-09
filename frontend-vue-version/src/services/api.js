import axios from "axios";
import useUserStore from "../stores/user";

const store = useUserStore();

axios.defaults.baseURL = "https://localhost:7246/api";

export const api = {
  async get(resource) {
    const response = await axios.get(`${resource}/listar`, {
      headers: { Authorization: `Bearer ${store.token}` },
    });
    return response.data;
  },

  async getById(resource, id) {
    const response = await axios.get(`/${resource}/obter/${id}`, {
      headers: { Authorization: `Bearer ${store.token}` },
    });
    return response.data;
  },

  async post(resource, data) {
    const response = await axios.post(`/${resource}/adicionar`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    });
    return response.data;
  },

  async put(resource, data) {
    const response = await axios.put(`/${resource}/atualizar`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    });
    return response.data;
  },

  async delete(resource, id) {
    const response = await axios.delete(`/${resource}/remover/${id}`, {
      headers: { Authorization: `Bearer ${store.token}` },
    });
    return response.data;
  },

  async createUser(data) {
    const response = await axios.post("/User/adicionar", data, {
      headers: { "Content-Type": "application/json" },
    });
    return await response.data;
  },

  async authenticateUser(data) {
    const response = await axios.post("/User/autenticar/", data, {
      headers: { "Content-Type": "application/json" },
    });
    return await response.data;
  },
};
