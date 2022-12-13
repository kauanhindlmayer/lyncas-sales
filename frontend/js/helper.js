import { Router } from "./router/router.js";
import { Api } from "./services/api.js";

export class Validator {
  handleSubmit(event) {
    event = event || window.event;
    event.preventDefault();

    const validatedFields = this.validateFields();

    if (validatedFields) {
      alert("Adicionado com sucesso!");
      this.clearInputs();
      this.redirect();
    }
  }

  validateEmptyFields() {
    for (let field of document.querySelectorAll(".field")) {
      if (!field.value) {
        alert("Nenhum campo pode estar vazio!");
        return false;
      }
    }

    return true;
  }

  validateEmail() {
    const email = document.querySelector(".email");

    if (email) {
      if (
        !email.value.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        this.createError(email, "E-mail inválido!");
        return false;
      }
    }

    return true;
  }

  validatePhone() {
    const phone = document.querySelector(".phone");

    if (phone) {
      if (!phone.value.match(/^(\(\d{2}\)\s*)?(9\s*)?(\d{4})-(\d{4})$/g)) {
        this.createError(phone, "Telefone inválido!");
        return false;
      }
    }

    return true;
  }

  validateCPF() {
    const cpf = document.querySelector(".cpf");

    if (cpf) {
      if (!cpf.value.match(/(?:\d{3}\.){2}\d{3}-\d{2}/g)) {
        this.createError(cpf, "CPF inválido!");
        return false;
      }
    }

    return true;
  }

  clearInputs() {
    for (let field of document.querySelectorAll(".field")) {
      field.classList.remove("error-input");
      field.value = "";
    }
  }

  redirect() {
    const router = new Router();
    const { pathname } = window.location;

    router.handle(
      `/pages/lista-de-${
        pathname === "/adicionar-cliente" ? "clientes" : "vendas"
      }.html`
    );
  }

  createError(field, message) {
    field.classList.add("error-input");
    alert(message);
  }

  validateFields() {
    if (!this.validateEmptyFields()) {
      return false;
    }

    if (!this.validateEmail()) {
      return false;
    }

    if (!this.validatePhone()) {
      return false;
    }

    if (!this.validateCPF()) {
      return false;
    }

    return true;
  }
}

export const append = (template) => {
  const tr = document.createElement("tr");
  tr.innerHTML = template;
  document.querySelector(".component__table").appendChild(tr);
};

export const createTable = async (resource, createRow) => {
  const api = new Api();
  const response = await api.get(resource);

  createRow(response);

  if (response.success) {
    document.querySelector(".spinner").classList.add("hide");
    document.querySelector(".default-message").classList.add("hide");
  }
};

export const createError = () => {
  document.querySelector(".spinner").classList.add("hide");
  document.querySelector(".default-message").classList.remove("hide");
};
