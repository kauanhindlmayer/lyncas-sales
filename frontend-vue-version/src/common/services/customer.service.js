import apiService from "@/common/api/api.service";

const customerService = {
  get(resource) {
    return apiService.get(`Customer/listar${resource ?? ""}`);
  },
  getById(id) {
    return apiService.get(`Customer/obter/${id}`);
  },
  save(customer) {
    if (customer.id) {
      return apiService.put("Customer/atualizar", customer);
    } else {
      return apiService.post("Customer/adicionar", customer);
    }
  },
  delete(id) {
    return apiService.delete(`Customer/remover/${id}`);
  },
};

export default customerService;
