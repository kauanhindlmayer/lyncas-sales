import axios from "axios";
import BASE_URL from "@/common/config/config";
import handleExpiredToken from "@/common/utils/helper";
import jwtService from "@/common/services/jwt.service";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) handleExpiredToken();
    return Promise.reject(error);
  }
);

const apiService = {
  init() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${jwtService.getToken()}`;
  },

  async get(resource) {
    this.init();
    const response = await axios.get(resource);
    return response.data;
  },

  async post(resource, data) {
    this.init();
    const response = await axios.post(resource, data);
    return response.data;
  },

  async put(resource, data) {
    this.init();
    const response = await axios.put(resource, data);
    return response.data;
  },

  async delete(resource) {
    this.init();
    const response = await axios.delete(resource);
    return response.data;
  },
};

export default apiService;
