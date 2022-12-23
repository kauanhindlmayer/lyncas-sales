import { api } from "./api.service.js";
import { append, createError, removeLoading } from "../helper.js";
import { Router } from "../router/router.js";

export const createCustomerTable = async () => {
  const response = await api.get("Customer");

  for (let customer of response.data) {
    const template = `
    <td class="table--left-corner">${customer.name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.cpf}</td>
    <td class="table--right-corner">
      <button 
        onclick="handleCustomerDelete('${customer.id}')" 
        class="table__button table__button--delete"
      >
        Deletar
      </button>

      <button 
        onclick="handleCustomerEdit('${customer.id}')" 
        class="table__button table__button--edit"
      >
        Editar
      </button>
    </td>
  `;

    append(template);
  }

  if (response.success) removeLoading();
  if (!response.success || response.data.length <= 0) createError();
};

export const createCustomer = async () => {
  const body = {
    name: document.querySelector("#name-input").value,
    email: document.querySelector("#email-input").value,
    phone: document.querySelector("#phone-input").value,
    cpf: document.querySelector("#cpf-input").value,
  };

  await api.post("Customer", body);

  const router = new Router();
  router.handle("/pages/lista-de-clientes.html");
};

const handleCustomerDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar o cliente?");

  if (answer) {
    await api.delete("Customer", id);
    const router = new Router();
    router.handle(`/pages/lista-de-clientes.html`);
  }
};

window.handleCustomerDelete = (id) => handleCustomerDelete(id);

const handleCustomerEdit = async (id) => {
  const router = new Router();
  router.handle("/pages/adicionar-cliente.html", `/atualizar-cliente?id=${id}`);
};

window.handleCustomerEdit = (id) => handleCustomerEdit(id);

export const updateCustomer = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const body = {
    id: urlParams.get("id"),
    name: document.querySelector("#name-input").value,
    email: document.querySelector("#email-input").value,
    phone: document.querySelector("#phone-input").value,
    cpf: document.querySelector("#cpf-input").value,
  };

  await api.put("Customer", body);

  const router = new Router();
  router.handle("/pages/lista-de-clientes.html");
};
