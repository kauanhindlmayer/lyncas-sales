import { api } from "./api.service";

export const sale = {
  async get(resource) {
    return await api.get(`Sale/listar${resource ?? ""}`);
  },
  async getById(id) {
    return await api.get(`Sale/obter/${id}`);
  },
  async create(data) {
    return await api.post("Sale/adicionar", data);
  },
  async update(data) {
    return await api.put("Sale/atualizar", data);
  },
  async delete(id) {
    return await api.delete(`Sale/remover/${id}`);
  },
};
