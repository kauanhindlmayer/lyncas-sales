import { config } from "../config.js";
import { createError } from "../helper.js";

export class Api {
  get(resource) {
    return fetch(`${config.baseURL}/${resource}/listar`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch(() => {
        createError();
      });
  }

  getById(resource, id) {
    return fetch(`${config.baseURL}/${resource}/obter/${id}`, {
      method: "GET",
    }).then((response) => response.json());
  }
}
