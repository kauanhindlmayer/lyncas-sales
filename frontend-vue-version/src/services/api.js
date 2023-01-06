import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7246/api",
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MjNlOTJiZS0wZWMyLTRlMjYtMWNmYS0wOGRhZTQxNzQxMTEiLCJ1c2VyTmFtZSI6IkthdWFuIiwiZXhwIjoxNjczMTE4ODU2LCJpc3MiOiJQcmVzc1N0YXJ0MiIsImF1ZCI6IlByZXNzU3RhcnQyIn0.86DKfU12OgOL97Qmi-W4sgpf_jutgaPe-5lv1b54m9k";

export const api = {
  async get(resource) {
    const response = await axiosInstance.get(`${resource}/listar`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async getById(resource, id) {
    const response = await axiosInstance.get(`/${resource}/obter/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async post(resource, data) {
    const response = await axiosInstance.post(`/${resource}/adicionar`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async put(resource, data) {
    const response = await axiosInstance.put(`/${resource}/atualizar`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async delete(resource, id) {
    const response = await axiosInstance.delete(`/${resource}/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
