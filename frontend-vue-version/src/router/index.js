import { createRouter, createWebHistory } from "vue-router";
import checkAuth from "../middlewares/checkAuth.js";

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lista-de-vendas",
      name: "sales-list",
      component: () => import("../views/SalesList.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lista-de-clientes",
      name: "customers-list",
      component: () => import("../views/CustomersList.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/adicionar-cliente",
      name: "create-customer",
      component: () => import("../views/CreateCustomer.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/adicionar-venda",
      name: "create-sale",
      component: () => import("../views/CreateSale.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/atualizar-cliente",
      name: "update-customer",
      component: () => import("../views/UpdateCustomer.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/atualizar-venda",
      name: "update-sale",
      component: () => import("../views/UpdateSale.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  checkAuth(to, from, next);
});

export default router;
