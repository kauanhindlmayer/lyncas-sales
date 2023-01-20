import { api } from "./services/api.service.js";
import { createDashboard } from "./services/dashboard.service.js";
import { createCustomerTable } from "./services/customer.service.js";
import { createSaleTable } from "./services/sale.service.js";
import { user } from "./services/user.service.js";
import { getToken } from "./services/jwt.service.js";

export const validator = {
  handleSubmit(event) {
    event = event || window.event;
    event.preventDefault();
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

    if (cpf && !validateCpf.validate(cpf.value)) {
      this.createError(cpf, "O número de CPF utilizado não é válido");
      return false;
    }

    return true;
  },

  createError(field, message) {
    field.classList.add("error-input");
    alert(message);
  },

  validateFields(event) {
    this.handleSubmit(event);

    if (!this.validateEmptyFields()) return false;

    if (!this.validateEmail()) return false;

    if (!this.validatePhone()) return false;

    if (!this.validateCPF()) return false;

    return true;
  },
};

const validateCpf = {
  cleanCpf: "",

  validate(cpfSent) {
    this.cleanCpf = cpfSent.replace(/\D+/g, "");
    if (typeof this.cleanCpf === "undefined") return false;
    if (this.cleanCpf.length !== 11) return false;
    if (this.isSequency()) return false;

    const partialCpf = this.cleanCpf.slice(0, -2);
    const firstDigit = this.createDigit(partialCpf);
    const secondDigit = this.createDigit(partialCpf + firstDigit);

    const newCpf = partialCpf + firstDigit + secondDigit;
    return newCpf === this.cleanCpf;
  },

  createDigit(partialCpf) {
    const cpfArray = Array.from(partialCpf);

    let regressive = cpfArray.length + 1;
    const total = cpfArray.reduce((amount, value) => {
      amount += Number(value) * regressive;
      regressive--;
      return amount;
    }, 0);

    const digit = 11 - (total % 11);
    return digit > 9 ? "0" : String(digit);
  },

  isSequency() {
    const sequency = this.cleanCpf[0].repeat(this.cleanCpf.length);
    return sequency === this.cleanCpf;
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

export const toLocaleDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export const toLocaleCurrency = (string) => {
  return string.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const isAuthenticated = () => {
  return getToken() ? true : false;
};

const fillSelect = async () => {
  const response = await api.get("Customer/listar");
  const select = document.querySelector("#customer-input");

  for (let customer of response.data) {
    select.options[select.options.length] = new Option(
      `${customer.name}`,
      `${customer.id}`
    );
  }
};

const disableMenu = () => {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".container").style.display = "block";
};

const enableMenu = () => {
  document.querySelector(".menu").style.display = "flex";
  document.querySelector(".container").style.display = "grid";
  document.querySelector(".username").innerHTML = user.name;
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

window.handleSubmitOnEnter = (event) => {
  if (event.key === "Enter") document.querySelector("button").click();
};

export const preventNumbers = (input) => {
  if (!input.checkValidity()) input.value = "";
};

window.preventNumbers = (input) => preventNumbers(input);
