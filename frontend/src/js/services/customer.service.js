import { api } from "./api.service.js";
import { router } from "../router/router.js";
import {
  createError,
  removeLoading,
  validator,
  alertError,
  createPagination,
} from "../helper.js";

export let pageSize = document.documentElement.clientWidth > 1366 ? "7" : "4";
export let customers;

export const createCustomerTable = async (resource) => {
  document.querySelector(".component__table tbody").innerHTML = "";

  const response = await api.get(
    `Customer/listar?Limit=${pageSize}${resource}`
  );

  if (!response.success || response.data.customers.length === 0) {
    createError();
    return;
  }

  for (let customer of response.data.customers) {
    const buttons = `
    <button onclick="handleCustomerDelete('${customer.id}')" 
    class="table__button table__button--delete">Deletar</button>

    <button onclick="handleCustomerEdit('${customer.id}')" 
      class="table__button table__button--edit">Editar</button>
    `;
    const template = `
      <td class="table--left-corner">${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.cpf}</td>
      <td class="table--right-corner">
        ${customer.isActive ? buttons : "Cliente inativo"}
      </td>
    `;

    const tr = document.createElement("tr");
    tr.innerHTML = template;

    if (!customer.isActive) tr.classList.add("customer-inactive");

    document.querySelector(".component__table tbody").appendChild(tr);
  }

  removeLoading();
};

window.createCustomer = async () => {
  if (validator.validateFields()) {
    const body = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      cpf: document.querySelector("#cpf").value,
    };

    const response = await api.post("Customer/adicionar", body);

    if (!response.success) {
      alertError(response);
      return;
    }

    router.handle("/pages/lista-de-clientes.html");

    alert(response.data.message);
  }
};

window.handleCustomerDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar o cliente?");

  if (answer) {
    const response = await api.delete(`Customer/remover/${id}`);

    if (!response.success) {
      alertError(response);
      return;
    }

    router.handle(`/pages/lista-de-clientes.html`);

    alert(response.data.message);
  }
};

window.handleCustomerEdit = async (id) => {
  router.handle("/pages/adicionar-cliente.html", `/atualizar-cliente?id=${id}`);

  const response = await api.get(`Customer/obter/${id}`);

  if (!response.success) {
    alert("Um erro inesperado aconteceu. Tente novamente mais tarde.");
    return;
  }

  const title = document.querySelector("#title");
  title.innerHTML = `${title.innerHTML.replace("Adicionar", "Atualizar")}`;

  document.querySelector("#name").value = response.data.name;
  document.querySelector("#email").value = response.data.email;
  document.querySelector("#phone").value = response.data.phone;
  document.querySelector("#cpf").value = response.data.cpf;

  document
    .querySelector(".save-button")
    .setAttribute("onclick", "updateCustomer()");
};

window.updateCustomer = async () => {
  if (validator.validateFields()) {
    const urlParams = new URLSearchParams(window.location.search);

    const body = {
      id: urlParams.get("id"),
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      cpf: document.querySelector("#cpf").value,
    };

    const response = await api.put("Customer/atualizar", body);

    if (!response.success) {
      alertError(response);
      return;
    }

    router.handle("/pages/lista-de-clientes.html");

    alert(response.data.message);
  }
};

window.searchCustomers = async () => {
  const searchInput = document.querySelector(".header__search-button");
  const filterSelect = document.querySelector(".header__select");

  if (!filterSelect.value) {
    filterSelect.focus();
    return;
  }

  document.querySelector(".component__table tbody").innerHTML = "";

  createCustomerTable(`&${filterSelect.value}=${searchInput.value}`);
};

export const paginate = async () => {
  const response = await api.get(`Customer/listar`);
  customers = response.data.recordsQuantity;
  const element = document.querySelector(".pagination ul");
  let totalPages = Math.ceil(customers / pageSize);
  let page = 1;
  element.innerHTML = createPagination(totalPages, page);
};
