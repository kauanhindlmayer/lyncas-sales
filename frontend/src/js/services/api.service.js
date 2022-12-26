import { config } from "../config.js";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDJhYzZhZi02ODgzLTRhMTktZDFhZi0wOGRhZTI3YzUwNjMiLCJ1c2VyTmFtZSI6ImthdWFuIiwiZXhwIjoxNjcyMTQyMjQ0LCJpc3MiOiJQcmVzc1N0YXJ0MiIsImF1ZCI6IlByZXNzU3RhcnQyIn0.AtBxUCxGNA7dCMhZK7CJjaGyJlqDdNTSHtF2WBcgve0";

export const api = {
  get(resource) {
    return fetch(`${config.baseURL}/${resource}/listar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => response.json());
  },

  getById(resource, id) {
    return fetch(`${config.baseURL}/${resource}/obter/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => response.json());
  },

  post(resource, body) {
    return fetch(`${config.baseURL}/${resource}/adicionar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },

  put(resource, body) {
    return fetch(`${config.baseURL}/${resource}/atualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },

  delete(resource, id) {
    return fetch(`${config.baseURL}/${resource}/remover/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => response.json());
  },

  authenticate() {
    return fetch(`${config.baseURL}/User/adicionar/`, {
      method: "GET",
    }).then((response) => response.json());
  },
};
