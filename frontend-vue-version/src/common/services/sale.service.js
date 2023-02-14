import apiService from "@/common/api/api.service";

const saleService = {
  list() {
    return apiService.get(`Sale/listar`);
  },
  listPaginated(limit, offset) {
    return apiService.get(`Sale/listar?Limit=${limit}&Offset=${offset}`);
  },
  getById(saleId) {
    return apiService.get(`Sale/obter/${saleId}`);
  },
  search(param, value) {
    return apiService.get(`Sale/listar?${param}=${value}`);
  },
  save(sale) {
    if (sale.id) {
      return apiService.put("Sale/atualizar", sale);
    } else {
      return apiService.post("Sale/adicionar", sale);
    }
  },
  delete(saleId) {
    return apiService.delete(`Sale/remover/${saleId}`);
  },
};

export default saleService;
