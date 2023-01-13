import { api } from "./api.service";
import { setUsername, setToken } from "./jwt.service";

export const user = {
  async create(data) {
    return await api.post("User/adicionar", data);
  },

  async authenticate(data) {
    const response = await api.post("User/autenticar", data);

    setUsername(response.userName);
    setToken(response.token);

    return response;
  },
};
