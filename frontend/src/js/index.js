import { Router } from "./router/router.js";
import { Validator } from "./helper.js";
import "./services/jwt.service.js";

const validator = new Validator();

window.handleSubmit = () => validator.handleSubmit();

const router = new Router();

router.add("/", "/pages/conectar-se.html")
router.add("/conectar-se", "/pages/conectar-se.html");
router.add("/criar-conta", "/pages/criar-conta.html");
router.add("/home", "/pages/home.html");
router.add("/dashboard", "/pages/dashboard.html");
router.add("/lista-de-clientes", "/pages/lista-de-clientes.html");
router.add("/lista-de-vendas", "/pages/lista-de-vendas.html");
router.add("/adicionar-cliente", "/pages/adicionar-cliente.html");
router.add("/adicionar-venda", "/pages/adicionar-venda.html");
router.add(404, "/pages/404.html");

router.handle();

window.onpopstate = () => router.handle();
window.route = () => router.route();
