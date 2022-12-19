import axios from "axios";

axios.create({
  baseURL: "https://localhost:7246/api",
});

export const api = {
  get(resource) {
    axios
      .get(`/${resource}/listar`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getById(resource, id) {
    axios
      .get(`/${resource}/obter/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  post(resource, body) {
    axios
      .get(`/${resource}/adicionar`, JSON.stringify(body))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  put(resource, body) {
    axios
      .get(`/${resource}/atualizar`, JSON.stringify(body))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  delete(resource, id) {
    axios
      .get(`/${resource}/remover/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
