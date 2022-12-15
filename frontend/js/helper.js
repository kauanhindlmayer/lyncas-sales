import { Api } from "./services/api.js";
import { createCustomer, updateCustomer } from "./services/customer.js";
import { createSale, updateSale } from "./services/sale.js";

export class Validator {
  handleSubmit(event) {
    event = event || window.event;
    event.preventDefault();

    const validatedFields = this.validateFields();

    if (validatedFields) {
      switch (window.location.pathname) {
        case "/adicionar-cliente":
          alert("Cliente Adicionado com sucesso!");
          createCustomer();
          break;
        case "/adicionar-venda":
          alert("Venda Adicionada com sucesso!");
          createSale();
          break;
        case "/atualizar-cliente":
          alert("Cliente Atualizado com sucesso!");
          updateCustomer();
          break;
        case "/atualizar-venda":
          alert("Venda Atualizada com sucesso!");
          updateSale();
          break;
      }
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

export const createError = () => {
  document.querySelector(".spinner").classList.add("hide");
  document.querySelector(".default-message").classList.remove("hide");
};

export const fillCustomerForm = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const api = new Api();
  const response = await api.getById("Customer", `${urlParams.get("id")}`);

  document.querySelector("#title").innerHTML = `${document
    .querySelector("#title")
    .innerHTML.replace("Adicionar", "Atualizar")}`;

  document.querySelector("#name-input").value = response.data.name;
  document.querySelector("#email-input").value = response.data.email;
  document.querySelector("#phone-input").value = response.data.phone;
  document.querySelector("#cpf-input").value = response.data.cpf;
};

export const fillSaleForm = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const api = new Api();
  const response = await api.getById("Sale", `${urlParams.get("id")}`);

  document.querySelector("#title").innerHTML = `${document
    .querySelector("#title")
    .innerHTML.replace("Adicionar", "Atualizar")}`;

  // customerId: "0aa76329-6266-4379-52cf-08dadc43d567";
  document.querySelector("#billing-date-input").value = response.data.billingDate.slice(0, 10);
  document.querySelector("#description-input").value = response.data.items[0].itemDescription;
  document.querySelector("#value-input").value = response.data.items[0].unitaryValue;
  document.querySelector("#quantity-input").value = response.data.items[0].quantity;
  document.querySelector("#total-value-input").value = response.data.items[0].totalValue;
};
