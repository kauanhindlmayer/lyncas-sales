import { api } from "./api.service";

export const sale = {
  async get() {
    return await api.get("Sale/listar");
  },
  async getById(id) {
    return await api.get(`Sale/obter/${id}`);
  },
  async create(data) {
    return await api.post("Sale/adicionar", data);
  },
  async update(data) {
    return await api.delete(`Sale/atualizar/${data.id}`, data);
  },
  async delete(id) {
    return await api.delete(`Sale/remover/${id}`);
  },
};
