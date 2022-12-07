import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../modules/Dashboard.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../modules/Dashboard.vue"),
    },
    {
      path: "/lista-de-vendas",
      name: "sales",
      component: () => import("../modules/SalesList.vue"),
    },
    {
      path: "/lista-de-clientes",
      name: "customer",
      component: () => import("../modules/CustomersList.vue"),
    },
  ],
});

export default router;