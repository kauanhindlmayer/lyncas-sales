import apiService from "@/common/api/api.service";

const customerService = {
  list() {
    return apiService.get(`Customer/listar`);
  },
  listPaginated(limit, offset) {
    return apiService.get(`Customer/listar?Limit=${limit}&Offset=${offset}`);
  },
  getById(customerId) {
    return apiService.get(`Customer/obter/${customerId}`);
  },
  search(param, value) {
    return apiService.get(`Customer/listar?${param}=${value}`);
  },
  save(customer) {
    if (customer.id) {
      return apiService.put("Customer/atualizar", customer);
    } else {
      return apiService.post("Customer/adicionar", customer);
    }
  },
  delete(customerId) {
    return apiService.delete(`Customer/remover/${customerId}`);
  },
};

export default customerService;
