import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    // {
    //   path: "/lista-de-vendas",
    //   name: "sales",
    //   component: () => import("../views/SalesList.vue"),
    // },
    // {
    //   path: "/lista-de-clientes",
    //   name: "customer",
    //   component: () => import("../views/CustomersList.vue"),
    // },
  ],
});

export default router;
