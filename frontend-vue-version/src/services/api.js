import axios from "axios";
import useUserStore from "../stores/user";

const user = useUserStore();

const instance = axios.create({
  baseURL: "https://localhost:7246/api",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});

export const api = {
  async get(resource) {
    const response = await instance.get(`${resource}/listar`);
    return response.data;
  },

  async getById(resource, id) {
    const response = await instance.get(`/${resource}/obter/${id}`);
    return response.data;
  },

  async post(resource, data, path) {
    const response = await instance.post(
      `/${resource}/${path ?? "adicionar"}`,
      data
    );
    return response.data;
  },

  async put(resource, data) {
    const response = await instance.put(`/${resource}/atualizar`, data);
    return response.data;
  },

  async delete(resource, id) {
    const response = await instance.delete(`/${resource}/remover/${id}`);
    return response.data;
  },
};
