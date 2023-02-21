import { defineStore } from "pinia";
import jwtService from "@/common/services/jwt.service";
import userService from "@/common/services/user.service";

const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: !!jwtService.getToken(),
    user: {},
  }),
  actions: {
    async login(user) {
      return await userService.authenticate(user).then((response) => {
        this.saveAuthenticationData(response);
      });
    },
    logout() {
      this.removeAuthenticationData();
    },
    saveAuthenticationData(user) {
      this.userLoggedIn = true;
      this.user = user;
      jwtService.setToken(user.token);
      jwtService.setUsername(user.userName);
    },
    removeAuthenticationData() {
      this.userLoggedIn = false;
      this.user = {};
      jwtService.removeToken();
      jwtService.removeUsername();
    },
  },
});

export default useUserStore;
