import apiService from "@/common/api/api.service";

const saleService = {
  get(resource) {
    return apiService.get(`Sale/listar${resource ?? ""}`);
  },
  paginate(limit, offset) {
    return apiService.get(`Sale/listar?Limit=${limit}&Offset=${offset}`);
  },
  getById(id) {
    return apiService.get(`Sale/obter/${id}`);
  },
  save(sale) {
    if (sale.id) {
      return apiService.put("Sale/atualizar", sale);
    } else {
      return apiService.post("Sale/adicionar", sale);
    }
  },
  delete(id) {
    return apiService.delete(`Sale/remover/${id}`);
  },
};

export default saleService;
