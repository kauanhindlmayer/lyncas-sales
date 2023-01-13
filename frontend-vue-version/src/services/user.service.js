import { api } from "./api.service";
import { setUsername, setToken } from "./jwt.service";
import useUserStore from "../stores/user";

export const user = {
  async create(data) {
    return await api.post("User/adicionar", data);
  },

  async authenticate(data) {
    const response = await api.post("User/autenticar", data);

    const store = useUserStore();

    store.name = response.userName;
    store.token = response.token;

    setUsername(response.userName);
    setToken(response.token);

    return response;
  },
};
