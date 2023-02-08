import apiService from "@/common/api/api.service";

const saleService = {
  get(resource) {
    return apiService.get(`Sale/listar${resource ?? ""}`);
  },
  getById(id) {
    return apiService.get(`Sale/obter/${id}`);
  },
  create(data) {
    return apiService.post("Sale/adicionar", data);
  },
  update(data) {
    return apiService.put("Sale/atualizar", data);
  },
  delete(id) {
    return apiService.delete(`Sale/remover/${id}`);
  },
};

export default saleService;
