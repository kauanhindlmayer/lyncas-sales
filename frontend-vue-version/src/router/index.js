import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/conectar-se",
      name: "login",
      component: () => import("../components/LoginForm.vue"),
    },
    {
      path: "/criar-conta",
      name: "register",
      component: () => import("../components/RegisterForm.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/lista-de-vendas",
      name: "sales-list",
      component: () => import("../views/SalesList.vue"),
    },
    {
      path: "/lista-de-clientes",
      name: "customers-list",
      component: () => import("../views/CustomersList.vue"),
    },
    {
      path: "/adicionar-cliente",
      name: "create-customer",
      component: () => import("../views/CreateCustomer.vue"),
    },
    {
      path: "/adicionar-venda",
      name: "create-sale",
      component: () => import("../views/CreateSale.vue"),
    },
  ],
});

export default router;
