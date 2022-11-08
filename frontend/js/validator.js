import { ValidateCpf } from "./validateCpf.js";
import { Router } from "./router.js";

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
    for(let field of document.querySelectorAll('.field')) {
      if (!field.value) {
        alert("Nenhum campo pode estar vazio!");
        return false;
      }
    }

    return true;
  }

  validateEmail() {
    const email = document.querySelector('.email');

    if (email) {
      if(!email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.createError(email, "E-mail inválido!");
        return false;
      }
    }

    return true;
  }

  validatePhone() {
    const phone = document.querySelector('.phone');

    if (phone) {
      if(!phone.value.match(/^(\(\d{2}\)\s*)?(9\s*)?(\d{4})-(\d{4})$/g)) {
        this.createError(phone, "Telefone inválido!");
        return false;
      }
    }

    return true;
  }

  validateCPF() {
    const inputCpf = document.querySelector('.cpf');

    if (inputCpf) {
      const cpf = new ValidateCpf(inputCpf.value);

      if (!cpf.validate()) {
        this.createError(inputCpf, "CPF inválido!");
        return false;
      }
    }

   return true;
  }

  clearInputs() {
    for(let field of document.querySelectorAll('.field')) {
      field.classList.remove("error-input")
      field.value = "";
    }
  }

  redirect() {
    const router = new Router();
    const { pathname } = window.location;
    router.handle(`/pages/lista-de-${pathname === '/lista-de-clientes' ? 'clientes' : 'vendas'}.html`);
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