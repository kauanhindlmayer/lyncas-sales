import axios from "axios";
import BASE_URL from "../config/config";
import { handleExpiredToken } from "../utils/helper";
import useUserStore from "../../stores/user";

const user = useUserStore();

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${user.token}` },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) handleExpiredToken();
    return Promise.reject(error);
  }
);

const apiService = {
  async get(resource) {
    const response = await axiosInstance.get(resource);
    return response.data;
  },

  async post(resource, data) {
    const response = await axiosInstance.post(resource, data);
    return response.data;
  },

  async put(resource, data) {
    const response = await axiosInstance.put(resource, data);
    return response.data;
  },

  async delete(resource) {
    const response = await axiosInstance.delete(resource);
    return response.data;
  },
};

export default apiService;
