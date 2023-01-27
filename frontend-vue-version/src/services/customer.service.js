import { api } from "./api.service";

export const customer = {
  async get(resource) {
    return await api.get(`Customer/listar${resource ?? ""}`);
  },
  async getById(id) {
    return await api.get(`Customer/obter/${id}`);
  },
  async create(data) {
    return await api.post("Customer/adicionar", data);
  },
  async update(data) {
    return await api.put("Customer/atualizar", data);
  },
  async delete(id) {
    return await api.delete(`Customer/remover/${id}`);
  },
};
