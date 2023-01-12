import axios from "axios";
import useUserStore from "../stores/user";

const user = useUserStore();

const instance = axios.create({
  baseURL: "https://localhost:7246/api/",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});

export const api = {
  async get(resource) {
    const response = await instance.get(resource);
    return response.data;
  },

  async post(resource, data) {
    const response = await instance.post(resource, data);
    return response.data;
  },

  async put(resource, data) {
    const response = await instance.put(resource, data);
    return response.data;
  },

  async delete(resource) {
    const response = await instance.delete(resource);
    return response.data;
  },
};
