import { Router } from "./router/router.js";
import { Validator, createTable } from "./helper.js";
import { createCustomerRow } from "./services/customer.js";
import { createSaleRow } from "./services/sale.js";

const validator = new Validator();

window.handleSubmit = () => validator.handleSubmit();

const router = new Router();

router.add("/dashboard", "/pages/dashboard.html");
router.add("/lista-de-clientes", "/pages/lista-de-clientes.html");
router.add("/lista-de-vendas", "/pages/lista-de-vendas.html");
router.add("/adicionar-cliente", "/pages/adicionar-cliente.html");
router.add("/adicionar-venda", "/pages/adicionar-venda.html");
router.add(404, "/pages/404.html");

window.onpopstate = () => router.handle();
window.route = () => router.route();

const handleMutation = () => {
  if (window.location.pathname === "/lista-de-vendas")
    createTable("Sale", createSaleRow);

  if (window.location.pathname === "/lista-de-clientes")
    createTable("Customer", createCustomerRow);
};

const mutationObserver = new MutationObserver(handleMutation);

mutationObserver.observe(document.querySelector(".main"), { childList: true });
