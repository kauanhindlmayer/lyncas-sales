export class Validator {
  handleSubmit(event) {
    event = event || window.event;
    event.preventDefault();
  
    const validatedFields = this.validateFields();
    
    if (validatedFields) {
      alert("Adicionado com sucesso!");
      this.clearInputs();
    }
  }

  validateEmptyFields() {
    let valid = true;

    for(let field of document.querySelectorAll('.field')) {
      if (!field.value) {
        alert("Nenhum campo pode estar vazio!");
        return valid = false;
      }
    }

    return valid;
  }

  validateEmail() {
    for(let field of document.querySelectorAll('.field')) {
      if (field.classList.contains('email')) {
        if(!field.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          this.createError(field, "E-mail inválido!");
          return false;
        }
      }
    }

    return true;
  }

  validateTel() {
    for(let field of document.querySelectorAll('.field')) {
      if (field.classList.contains('tel')) {
        if(!field.value.match(/^(\(\d{2}\)\s*)?(9\s*)?(\d{4})-(\d{4})$/g)) {
          this.createError(field, "Telefone inválido!");
          return false;
        }
      }
    }

    return true;
  }

  validateCPF() {
    for(let field of document.querySelectorAll('.field')) {
      if (field.classList.contains('cpf')) {
        if(!field.value.match(/(?:\d{3}\.){2}\d{3}-\d{2}/g)) {
          this.createError(field, "CPF inválido!");
          return false;
        }
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

    if (!this.validateTel()) {
      return false;
    }

    if (!this.validateCPF()) {
      return false;
    }
    
    return true;
  }
}