import { createRouter, createWebHistory } from "vue-router";
import checkAuth from "@/common/middlewares/checkAuth.js";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/full-layout/FullLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/dashboard/Index.vue"),
        meta: { requiresAuth: true, title: "Home" },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/Index.vue"),
        meta: { requiresAuth: true, title: "Dashboard" },
      },
      {
        path: "/lista-de-vendas",
        name: "sales-list",
        component: () => import("@/views/sales/Index.vue"),
        meta: { requiresAuth: true, title: "Lista de Vendas" },
      },
      {
        path: "/adicionar-venda",
        name: "create-sale",
        component: () => import("@/views/sales/Formulary.vue"),
        meta: { requiresAuth: true, title: "Adicionar Venda" },
      },
      {
        path: "/atualizar-venda",
        name: "update-sale",
        component: () => import("@/views/sales/Formulary.vue"),
        meta: { requiresAuth: true, title: "Atualizar Venda" },
      },
      {
        path: "/lista-de-clientes",
        name: "customers-list",
        component: () => import("@/views/customers/Index.vue"),
        meta: { requiresAuth: true, title: "Lista de Clientes" },
      },
      {
        path: "/adicionar-cliente",
        name: "create-customer",
        component: () => import("@/views/customers/Formulary.vue"),
        meta: { requiresAuth: true, title: "Adicionar Cliente" },
      },

      {
        path: "/atualizar-cliente",
        name: "update-customer",
        component: () => import("@/views/customers/Formulary.vue"),
        meta: { requiresAuth: true, title: "Atualizar Cliente" },
      },
    ],
  },
  {
    path: "/",
    redirect: "/conectar-se",
    component: () => import("@/layouts/blank-layout/BlankLayout.vue"),
    children: [
      {
        path: "/conectar-se",
        name: "login",
        component: () => import("@/views/authentication/Login.vue"),
        meta: { title: "Conectar-se" },
      },
      {
        path: "/criar-conta",
        name: "register",
        component: () => import("@/views/authentication/Register.vue"),
        meta: { title: "Criar Conta" },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/views/authentication/Error.vue"),
    meta: { title: "Error" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "menu__item--active",
  routes,
});

router.beforeEach((to, from, next) => {
  checkAuth(to, from, next);
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = `Lyncas Sales - ${to.meta.title}`;
  next();
});

export default router;
