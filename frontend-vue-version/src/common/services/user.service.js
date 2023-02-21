import apiService from "@/common/api/api.service";
import jwtService from "@/common/services/jwt.service";

const userService = {
  register(user) {
    return apiService.post("User/adicionar", user);
  },
  async authenticate(user) {
    const response = await apiService.post("User/autenticar", user);

    jwtService.setUsername(response.userName);
    jwtService.setToken(response.token);

    return response;
  },
};

export default userService;
