import { Router } from "./router.js";
import { Validator } from "./validator.js";

const router = new Router();

router.add('/dashboard', '/pages/dashboard.html');
router.add('/lista-de-clientes', '/pages/lista-de-clientes.html');
router.add('/lista-de-vendas', '/pages/lista-de-vendas.html');
router.add('/adicionar-cliente', '/pages/adicionar-cliente.html');
router.add('/adicionar-venda', '/pages/adicionar-venda.html');
router.add(404, '/pages/404.html');

window.onpopstate = () => router.handle();
window.route = () => router.route();

const validator = new Validator();

window.handleSubmit = () =>  validator.handleSubmit();