import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7246/api",
});

export const api = {
  get(resource) {
    axiosInstance
      .get(`${resource}/listar`)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getById(resource, id) {
    axiosInstance
      .get(`/${resource}/obter/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  post(resource, body) {
    axiosInstance
      .get(`/${resource}/adicionar`, JSON.stringify(body))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  put(resource, body) {
    axiosInstance
      .get(`/${resource}/atualizar`, JSON.stringify(body))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  delete(resource, id) {
    axiosInstance
      .get(`/${resource}/remover/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
