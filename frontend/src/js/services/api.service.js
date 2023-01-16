import { config } from "../config.js";
import { user, handleExpiredToken } from "./user.service.js";

export const api = {
  get(resource) {
    return fetch(`${config.baseURL}/${resource}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${user.token}` },
    }).then((response) => {
      if (response.status === 401) handleExpiredToken();
      return response.json();
    });
  },

  post(resource, body) {
    return fetch(`${config.baseURL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 401) handleExpiredToken();
      return response.json();
    });
  },

  put(resource, body) {
    return fetch(`${config.baseURL}/${resource}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 401) handleExpiredToken();
      return response.json();
    });
  },

  delete(resource, id) {
    return fetch(`${config.baseURL}/${resource}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    }).then((response) => {
      if (response.status === 401) handleExpiredToken();
      return response.json();
    });
  },
};
