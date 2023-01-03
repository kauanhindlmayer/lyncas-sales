import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7246/api",
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MjNlOTJiZS0wZWMyLTRlMjYtMWNmYS0wOGRhZTQxNzQxMTEiLCJ1c2VyTmFtZSI6IkthdWFuIiwiZXhwIjoxNjcyODM3Mjc4LCJpc3MiOiJQcmVzc1N0YXJ0MiIsImF1ZCI6IlByZXNzU3RhcnQyIn0.IfGpjzUMdeyu-fUdk27d0rLTq13ZpKCfBKyMk2r2Zig";

export const api = {
  get(resource) {
    return axiosInstance
      .get(`${resource}/listar`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  },
  getById(resource, id) {
    return axiosInstance
      .get(`/${resource}/obter/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  },
  post(resource, data) {
    return axiosInstance
      .post(`/${resource}/adicionar`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  },
  put(resource, data) {
    return axiosInstance
      .put(`/${resource}/atualizar`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  },
  delete(resource, id) {
    return axiosInstance
      .delete(`/${resource}/remover/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  },
};
