import { api } from "./api.service.js";
import { router } from "../router/router.js";
import {
  createError,
  removeLoading,
  validator,
  alertError,
} from "../helper.js";

const pages = [];
let currentPage = 0;
let quantityCustomers = 0;

export const createCustomerTable = async (resource) => {
  await configurePagination();

  const userWidth = document.documentElement.clientWidth;

  const response = await api.get(
    `Customer/listar?Limit=${userWidth > 1366 ? "7" : "4"}${resource}`
  );

  if (!response.success || response.data.length === 0) {
    createError();
    return;
  }

  for (let customer of response.data) {
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
  // document.querySelector(".component__pagination").style.display = "flex";
  const searchInput = document.querySelector(".header__search-button");
  const filterSelect = document.querySelector(".header__select");

  if (!filterSelect.value) {
    filterSelect.focus();
    return;
  }

  document.querySelector(".component__table tbody").innerHTML = "";

  createCustomerTable(`&${filterSelect.value}=${searchInput.value}`);
};

const configurePagination = async () => {
  const customers = await api.get(`Customer/listar`);
  quantityCustomers = customers.data.length;

  const userWidth = document.documentElement.clientWidth;
  const offset = userWidth > 1366 ? 7 : 4;

  for (let i = 0; i < quantityCustomers; i++) {
    pages.push(i * offset);
  }
};

window.gofoward = (event) => {
  event.preventDefault();

  if (currentPage === pages.length) return;

  const pageNumbers = document.querySelectorAll(".pageNumber");
  pageNumbers[currentPage].classList.remove("active");

  currentPage += 1;

  document.querySelector(".component__table tbody").innerHTML = "";

  createCustomerTable(`&Offset=${pages[currentPage]}`);

  pageNumbers[currentPage].classList.add("active");
};

window.handlePagination = (event, input) => {
  event.preventDefault();

  const pageNumbers = document.querySelectorAll(".pageNumber");
  pageNumbers[currentPage].classList.remove("active");

  currentPage = input.innerHTML - 1;

  document.querySelector(".component__table tbody").innerHTML = "";

  createCustomerTable(`&Offset=${pages[currentPage]}`);

  pageNumbers[currentPage].classList.add("active");
};

window.goback = (event) => {
  event.preventDefault();

  if (currentPage === 0) return;

  const pageNumbers = document.querySelectorAll(".pageNumber");
  pageNumbers[currentPage].classList.remove("active");

  currentPage -= 1;

  document.querySelector(".component__table tbody").innerHTML = "";

  createCustomerTable(`&Offset=${pages[currentPage]}`);

  pageNumbers[currentPage].classList.add("active");
};
