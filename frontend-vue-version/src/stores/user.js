import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({ name: "user.name", token: "user.token" }),
});
