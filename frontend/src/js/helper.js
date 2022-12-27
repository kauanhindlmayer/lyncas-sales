import { api } from "./services/api.service.js";
import { createDashboard } from "./services/dashboard.service.js";
import { createCustomerTable } from "./services/customer.service.js";
import { createSaleTable } from "./services/sale.service.js";
import { user } from "./services/jwt.service.js";

export const validator = {
  handleSubmit(event) {
    event = event || window.event;
    event.preventDefault();

    return this.validateFields();
  },

  validateEmptyFields() {
    for (let field of document.querySelectorAll(".field")) {
      if (!field.value) {
        alert("Preencha todos os campos.");
        return false;
      }
    }

    return true;
  },

  validateEmail() {
    const email = document.querySelector(".email");
    const regExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email && !email.value.match(regExp)) {
      this.createError(email, "O endereço de E-mail utilizado não é válido.");
      return false;
    }

    return true;
  },

  validatePhone() {
    const phone = document.querySelector(".phone");
    const regExp = /^(\(\d{2}\)\s*)?(9\s*)?(\d{4})-(\d{4})$/g;

    if (phone && !phone.value.match(regExp)) {
      this.createError(phone, "O número de Telefone utilizado não é válido.");
      return false;
    }

    return true;
  },

  validateCPF() {
    const cpf = document.querySelector(".cpf");

    if (cpf && !cpf.value.match(/(?:\d{3}\.){2}\d{3}-\d{2}/g)) {
      this.createError(cpf, "O número de CPF utilizado não é válido");
      return false;
    }

    return true;
  },

  createError(field, message) {
    field.classList.add("error-input");
    alert(message);
  },

  validateFields() {
    if (!this.validateEmptyFields()) return false;

    if (!this.validateEmail()) return false;

    if (!this.validatePhone()) return false;

    if (!this.validateCPF()) return false;

    return true;
  },
};

export const append = (template) => {
  const tr = document.createElement("tr");
  tr.innerHTML = template;
  document.querySelector(".component__table").appendChild(tr);
};

export const removeLoading = () => {
  document.querySelector(".spinner").classList.add("hide");
  document.querySelector(".default-message").classList.add("hide");
};

export const createError = () => {
  document.querySelector(".spinner").classList.add("hide");
  document.querySelector(".default-message").classList.remove("hide");
};

const fillSelect = async () => {
  const response = await api.get("Customer");
  const select = document.querySelector("#customer-input");

  for (let customer of response.data) {
    select.options[select.options.length] = new Option(
      `${customer.name}`,
      `${customer.id}`
    );
  }
};

export const options = {
  style: "currency",
  currency: "BRL",
};

export const sortByMonths = (response) => {
  let sortedObject = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let sale of response) {
    const saleMonth = new Date(sale.billingDate).getMonth();
    sortedObject[saleMonth] += Math.round(sale.totalValue);
  }

  return sortedObject;
};

export const monthsOfTheYear = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const disableMenu = () => {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".container").style.display = "block";
};

const enableMenu = () => {
  document.querySelector(".menu").style.display = "flex";
  document.querySelector(".container").style.display = "grid";
  document.querySelector(".username").innerHTML = user.name;
};

export const isAuthenticated = () => {
  return localStorage.getItem("lyncas-sales-token") ? true : false;
};

const toggleMenu = (route) => {
  route !== "/pages/conectar-se.html" &&
  route !== "/pages/criar-conta.html" &&
  isAuthenticated()
    ? enableMenu()
    : disableMenu();
};

export const loadComponents = (route) => {
  toggleMenu(route);

  if (route === "/pages/dashboard.html") createDashboard();
  if (route === "/pages/lista-de-clientes.html") createCustomerTable();
  if (route === "/pages/lista-de-vendas.html") createSaleTable();
  if (route === "/pages/adicionar-venda.html") fillSelect();
};

const handleSubmitOnEnter = (event) => {
  if (event.key === "Enter") document.querySelector("button").click();
};

window.handleSubmitOnEnter = (event) => handleSubmitOnEnter(event);
