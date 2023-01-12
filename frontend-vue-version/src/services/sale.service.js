import { api } from "./api.service";

export const sale = {
  async getById(id) {
    return await api.post(`Sale/obter/${id}`);
  },

  async create(data) {
    return await api.post("Sale/adicionar", data);
  },
};
