import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    name: localStorage.getItem("lyncas-sales-username"),
    token: localStorage.getItem("lyncas-sales-token"),
  }),
});
