import { createRouter, createWebHistory } from "vue-router";
import checkAuth from "../middlewares/checkAuth.js";

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "menu__item--active",
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
      component: () => import("../views/LoginForm.vue"),
    },
    {
      path: "/criar-conta",
      name: "register",
      component: () => import("../views/RegisterForm.vue"),
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
      component: () => import("../views/SaleList.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/lista-de-clientes",
      name: "customers-list",
      component: () => import("../views/CustomerList.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/adicionar-cliente",
      name: "create-customer",
      component: () => import("../views/CustomerCreate.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/adicionar-venda",
      name: "create-sale",
      component: () => import("../views/SaleCreate.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/atualizar-cliente",
      name: "update-customer",
      component: () => import("../views/CustomerUpdate.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/atualizar-venda",
      name: "update-sale",
      component: () => import("../views/SaleUpdate.vue"),
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
