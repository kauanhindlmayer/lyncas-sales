import apiService from "./api.service";
import jwtService from "./jwt.service";

const userService = {
  create(data) {
    return apiService.post("User/adicionar", data);
  },

  authenticate(data) {
    const response = apiService.post("User/autenticar", data);

    jwtService.setUsername(response.userName);
    jwtService.setToken(response.token);

    return response;
  },
};

export default userService;
