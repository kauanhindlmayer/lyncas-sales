export class Api {
  baseURL = "https://localhost:7246/api";

  get(resource) {
    return fetch(`${this.baseURL}/${resource}/listar`, {
      method: "GET",
    })
      .then((response) => response.json())
      // .then((data) => console.log(data));
  }

  getById(resource, id) {
    return fetch(`${this.baseURL}/${resource}/obter/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      // .then((data) => console.log(data));
  }
}
