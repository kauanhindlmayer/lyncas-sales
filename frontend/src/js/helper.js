import { api } from "./services/api.service.js";
import { user } from "./services/user.service.js";
import { getToken } from "./services/jwt.service.js";
import { createDashboard } from "./services/dashboard.service.js";
import { createSaleTable } from "./services/sale.service.js";
import { createCustomerTable } from "./services/customer.service.js";

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
      this.createError(email, "O E-mail precisa ser válido.");
      return false;
    }

    return true;
  },

  validatePhone() {
    const phone = document.querySelector(".phone");
    const regExp = /^(\(\d{2}\)\s*)?(9\s*)?(\d{4})-(\d{4})$/g;

    if (phone && !phone.value.match(regExp)) {
      this.createError(phone, "O Telefone precisa ser válido.");
      return false;
    }

    return true;
  },

  validateCPF() {
    const cpf = document.querySelector(".cpf");

    if (cpf && !validateCpf.validate(cpf.value)) {
      this.createError(cpf, "O CPF precisa ser válido.");
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

export const fillSelect = async () => {
  const response = await api.get("Customer/listar");
  const select = document.querySelector("#customer");

  for (let customer of response.data.customers) {
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
  if (route === "/pages/lista-de-clientes.html") paginate("Customer");
  if (route === "/pages/lista-de-vendas.html") paginate("Sale");
  if (route === "/pages/adicionar-venda.html") fillSelect();
};

export const alertError = (response) => {
  let errorMessage = response.notifications[0].message;

  for (let i = 1; i < response.notifications.length; i++)
    errorMessage += `\n${response.notifications[i].message}`;

  alert(errorMessage);
};

const changePageSizeDisplay = () => {
  const pageSize = document.documentElement.clientWidth > 1366 ? "7" : "4";
  const option = document.querySelector(".first-option");
  option.setAttribute("value", pageSize);
  option.innerHTML = pageSize;
};

export let pageSize = document.documentElement.clientWidth > 1366 ? "7" : "4";

export const paginate = async (resource, prop) => {
  const property = prop ? prop.slice(1) : "";
  const response = await api.get(`${resource}/listar?${property}`);
  const records = response.data.recordsQuantity;
  const element = document.querySelector(".pagination ul");
  const totalPages = Math.ceil(records / pageSize);
  element.innerHTML = createPagination(totalPages, 1, records, resource, prop);

  changePageSizeDisplay();
};

window.createPagination = (totalPages, page, records, resource, prop) => {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    liTag += `<li class="btn prev" onclick="createPagination(${totalPages}, 
      ${page - 1}, ${records}, '${resource}')"><span> < </span></li>`;
  }

  if (page > 3) {
    liTag += `<li class="first numb" onclick="createPagination(${totalPages}, 1, ${records}, '${resource}')"><span>1</span></li>`;
    liTag += `<li class="dots"><span>...</span></li>`;
  }

  if (page == totalPages && page > 2) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1 && page > 2) {
    beforePage = beforePage - 1;
  }

  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }

    if (plength == 0) {
      plength = plength + 1;
    }

    if (page == plength) {
      active = "active";
    } else {
      active = "";
    }

    liTag += `<li class="numb ${active}" onclick="createPagination(${totalPages}, ${plength}, ${records}, '${resource}')"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 2) {
    liTag += `<li class="dots"><span>...</span></li>`;
    liTag += `<li class="last numb" onclick="createPagination(${totalPages}, ${totalPages}, ${records}, '${resource}')"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next" onclick="createPagination(${totalPages}, ${
      page + 1
    }, ${records}, '${resource}')"><span> > </span></li>`;
  }

  document.querySelector(".pagination ul").innerHTML = liTag;

  const currentPageIndex = Number(
    document.querySelector(".active span").innerHTML
  );
  const offset = currentPageIndex * pageSize - pageSize;
  resource === "Customer"
    ? createCustomerTable(`&Offset=${offset}${prop ? prop : ""}`)
    : createSaleTable(`&Offset=${offset}${prop ? prop : ""}`);

  document.querySelector(".quantity").innerHTML = records;

  document.querySelector(".offset").innerHTML = offset === 0 ? 1 : offset;

  document.querySelector(".limit").innerHTML =
    currentPageIndex * pageSize > records
      ? records
      : currentPageIndex * pageSize;

  return liTag;
};

window.changePageSize = (resource) => {
  pageSize = document.querySelector(".header__select--paginate").value;
  paginate(resource);
};

window.sortCustomersBy = (resource) => {
  paginate("Customer", `&Sort=${resource}`);
};

window.sortSalesBy = (resource) => {
  paginate("Sale", `&Sort=${resource}`);
};
