import { api } from "./services/api.service.js";

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

export const fillCustomerForm = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const response = await api.getById("Customer", `${urlParams.get("id")}`);

  document.querySelector("#title").innerHTML = `${document
    .querySelector("#title")
    .innerHTML.replace("Adicionar", "Atualizar")}`;

  document.querySelector("#name-input").value = response.data.name;
  document.querySelector("#email-input").value = response.data.email;
  document.querySelector("#phone-input").value = response.data.phone;
  document.querySelector("#cpf-input").value = response.data.cpf;

  document
    .querySelector(".save-button")
    .setAttribute("onclick", "updateCustomer()");
};

export const fillSaleForm = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const response = await api.getById("Sale", `${urlParams.get("id")}`);

  document.querySelector("#title").innerHTML = `${document
    .querySelector("#title")
    .innerHTML.replace("Adicionar", "Atualizar")}`;

  document.querySelector("#customer-input").value = response.data.customerId;
  document.querySelector("#billing-date-input").value =
    response.data.billingDate.slice(0, 10);
  document.querySelector("#description-input").value =
    response.data.items[0].itemDescription;
  document.querySelector("#value-input").value =
    response.data.items[0].unitaryValue;
  document.querySelector("#quantity-input").value =
    response.data.items[0].quantity;
  document.querySelector("#total-value-input").value =
    response.data.items[0].totalValue;

  document.querySelector(".footer__total-value").innerHTML =
    response.data.items[0].totalValue.toLocaleString("pt-BR", options);

  document
    .querySelector(".save-button")
    .setAttribute("onclick", "updateSale()");
};

export const fillSelect = async () => {
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
