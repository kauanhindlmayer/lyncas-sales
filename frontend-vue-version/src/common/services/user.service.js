import apiService from "@/common/api/api.service";
import jwtService from "@/common/services/jwt.service";

const userService = {
  create(data) {
    return apiService.post("User/adicionar", data);
  },

  async authenticate(data) {
    const response = await apiService.post("User/autenticar", data);

    jwtService.setUsername(response.userName);
    jwtService.setToken(response.token);

    return response;
  },
};

export default userService;
