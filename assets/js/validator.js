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
        return valid = false;
      }
    }

    return valid;
  }

  validateEmail() {
    for(let field of document.querySelectorAll('.field')) {
      if (field.classList.contains('email')) {
        if(!field.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
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
          return valid = false;
        }
      }
    }

    return true;
  }

  validateCPF() {
    for(let field of document.querySelectorAll('.field')) {
      if (field.classList.contains('cpf')) {
        if(!field.value.match(/(?:\d{3}\.){2}\d{3}-\d{2}/g)) {
          return false;
        }
      }
    }

    return true;
  }

  clearInputs() {
    for(let field of document.querySelectorAll('.field')) {
      field.value = "";
    }
  }

  validateFields() {
    if (!this.validateEmptyFields()) {
      alert("Nenhum campo pode estar em branco!");
      return false;
    }

    if (!this.validateEmail()) {
      alert("E-mail inválido!")
      return false;
    }

    if (!this.validateTel()) {
      alert("Telefone inválido!")
      return false;
    }

    if (!this.validateCPF()) {
      alert("CPF inválido!")
      return false;
    }
    
    return true;
  }
}