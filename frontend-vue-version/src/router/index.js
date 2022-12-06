import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import SalesList from "../views/SalesList.vue";
import CustomersList from "../views/CustomersList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/lista-de-vendas",
      name: "sales",
      component: SalesList,
    },
    {
      path: "/lista-de-clientes",
      name: "customer",
      component: CustomersList,
    },
  ],
});

export default router;
