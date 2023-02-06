import { defineStore } from "pinia";
import jwtService from "../services/jwt.service";

export default defineStore("user", {
  state: () => ({
    name: jwtService.getUsername(),
    token: jwtService.getToken(),
  }),
});
