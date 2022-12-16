import { append, createError } from "../helper.js";
import { Api } from "./api.js";
import { Router } from "../router/router.js";

export const createCustomerTable = async () => {
  const api = new Api();
  const response = await api.get("Customer");

  for (let customer of response.data) {
    const template = `
    <td class="table--left-corner">${customer.name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.cpf}</td>
    <td class="table--right-corner">
      <button onclick="handleDelete('${customer.id}')" class="table__button table__button--delete">Deletar</button>
      <button onclick="handleEdit('${customer.id}')" class="table__button table__button--edit">Editar</button>
    </td>
  `;

    append(template);
  }

  if (response.success) {
    document.querySelector(".spinner").classList.add("hide");
    document.querySelector(".default-message").classList.add("hide");
  }

  if (!response.success || response.data.length == 0) createError();
};

export const createCustomer = async () => {
  const body = {
    name: document.querySelector("#name-input").value,
    email: document.querySelector("#email-input").value,
    phone: document.querySelector("#phone-input").value,
    cpf: document.querySelector("#cpf-input").value,
  };

  const api = new Api();
  await api.post("Customer", body);

  const router = new Router();
  router.handle("/pages/lista-de-clientes.html");
};

const handleDelete = async (id) => {
  const { pathname } = window.location;
  const resource = pathname === "/lista-de-clientes" ? "Customer" : "Sale";

  const answer = confirm(
    `Deseja realmente deletar ${
      pathname === "/lista-de-clientes" ? "o cliente" : "a venda"
    }?`
  );

  if (answer) {
    const api = new Api();
    await api.delete(`${resource}`, id);

    const router = new Router();
    router.handle(
      `/pages/lista-de-${
        pathname === "/lista-de-clientes" ? "clientes" : "vendas"
      }.html`
    );
  }
};

window.handleDelete = (id) => handleDelete(id);

const handleEdit = async (id) => {
  const { pathname } = window.location;
  const resource = pathname === "/lista-de-clientes" ? "cliente" : "venda";

  const router = new Router();
  router.handle(
    `/pages/adicionar-${resource}.html`,
    `/atualizar-${resource}?id=${id}`
  );
};

window.handleEdit = (id) => handleEdit(id);

export const updateCustomer = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const body = {
    id: urlParams.get("id"),
    name: document.querySelector("#name-input").value,
    email: document.querySelector("#email-input").value,
    phone: document.querySelector("#phone-input").value,
    cpf: document.querySelector("#cpf-input").value,
  };

  const api = new Api();
  await api.put("Customer", body);

  const router = new Router();
  router.handle("/pages/lista-de-clientes.html");
};
