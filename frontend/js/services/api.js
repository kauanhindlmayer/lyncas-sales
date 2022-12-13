import { config } from "../config.js";

export class Api {
  get(resource) {
    return fetch(`${config.baseURL}/${resource}/listar`, {
      method: "GET",
    }).then((response) => response.json());
  }

  getById(resource, id) {
    return fetch(`${config.baseURL}/${resource}/obter/${id}`, {
      method: "GET",
    }).then((response) => response.json());
  }
}
