import axios from "axios";
import useUserStore from "../stores/user";

const user = useUserStore();

const instance = axios.create({
  baseURL: "https://localhost:7246/api",
});

const auth = {
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
};

export const api = {
  async get(resource) {
    const response = await instance.get(`${resource}/listar`, auth);
    return response.data;
  },

  async getById(resource, id) {
    const response = await instance.get(`/${resource}/obter/${id}`, auth);
    return response.data;
  },

  async post(resource, data) {
    const response = await instance.post(`/${resource}/adicionar`, data, auth);
    return response.data;
  },

  async put(resource, data) {
    const response = await instance.put(`/${resource}/atualizar`, data, auth);
    return response.data;
  },

  async delete(resource, id) {
    const response = await instance.delete(`/${resource}/remover/${id}`, auth);
    return response.data;
  },

  async validateToken() {
    const response = await instance.get(`/User/validar`, auth);
    return await response.status;
  },

  async createUser(data) {
    const response = await instance.post("/User/adicionar", data);
    return await response.data;
  },

  async authenticateUser(data) {
    const response = await instance.post("/User/autenticar/", data);
    return await response.data;
  },
};
