import { createRouter, createWebHistory } from "vue-router";
import checkAuth from "../common/middlewares/checkAuth.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true, title: "Home" },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true, title: "Dashboard" },
  },
  {
    path: "/lista-de-vendas",
    name: "sales-list",
    component: () => import("../views/Sales/SaleList.vue"),
    meta: { requiresAuth: true, title: "Lista de Vendas" },
  },
  {
    path: "/lista-de-clientes",
    name: "customers-list",
    component: () => import("../views/Customers/CustomerList.vue"),
    meta: { requiresAuth: true, title: "Lista de Clientes" },
  },
  {
    path: "/adicionar-cliente",
    name: "create-customer",
    component: () => import("../views/Customers/CustomerCreate.vue"),
    meta: { requiresAuth: true, title: "Adicionar Cliente" },
  },
  {
    path: "/adicionar-venda",
    name: "create-sale",
    component: () => import("../views/Sales/SaleCreate.vue"),
    meta: { requiresAuth: true, title: "Adicionar Venda" },
  },
  {
    path: "/atualizar-cliente",
    name: "update-customer",
    component: () => import("../views/Customers/CustomerUpdate.vue"),
    meta: { requiresAuth: true, title: "Atualizar Cliente" },
  },
  {
    path: "/atualizar-venda",
    name: "update-sale",
    component: () => import("../views/Sales/SaleUpdate.vue"),
    meta: { requiresAuth: true, title: "Atualizar Venda" },
  },
  {
    path: "/conectar-se",
    name: "login",
    component: () => import("../views/LoginForm.vue"),
    meta: { title: "Conectar-se" },
  },
  {
    path: "/criar-conta",
    name: "register",
    component: () => import("../views/RegisterForm.vue"),
    meta: { title: "Criar Conta" },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("../views/404.vue"),
    meta: { title: "404" },
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
