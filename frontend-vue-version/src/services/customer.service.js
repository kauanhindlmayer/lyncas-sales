import apiService from "./api.service";

const customerService = {
  get(resource) {
    return apiService.get(`Customer/listar${resource ?? ""}`);
  },
  getById(id) {
    return apiService.get(`Customer/obter/${id}`);
  },
  create(data) {
    return apiService.post("Customer/adicionar", data);
  },
  update(data) {
    return apiService.put("Customer/atualizar", data);
  },
  delete(id) {
    return apiService.delete(`Customer/remover/${id}`);
  },
};

export default customerService;
