import { api } from "./api.service";
import { setUsername, setToken } from "./jwt.service";
import useUserStore from "../stores/user";

export const user = {
  async create(data) {
    return await api.post("User", data);
  },

  async authenticate(data) {
    const response = await api.post("User", data, "autenticar");

    const store = useUserStore();

    store.name = response.userName;
    store.token = response.token;

    setUsername(response.userName);
    setToken(response.token);

    return response;
  },
};
