import { defineStore } from "pinia";
import jwtService from "../common/services/jwt.service";

export default defineStore("user", {
  state: () => ({
    name: jwtService.getUsername(),
    token: jwtService.getToken(),
  }),
});
