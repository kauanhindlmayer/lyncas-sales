import { api } from "./api.service.js";
import { router } from "../router/router.js";
import { append, createError, removeLoading, validator } from "../helper.js";

export const createCustomerTable = async () => {
  try {
    const response = await api.get("Customer");

    if (!response.success) throw "Error";

    for (let customer of response.data) {
      const template = `
      <td class="table--left-corner">${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.cpf}</td>
      <td class="table--right-corner">
        <button 
          onclick="handleCustomerDelete('${customer.id}')" 
          class="table__button table__button--delete"
        >
          Deletar
        </button>
  
        <button 
          onclick="handleCustomerEdit('${customer.id}')" 
          class="table__button table__button--edit"
        >
          Editar
        </button>
      </td>
    `;

      append(template);
    }

    removeLoading();
  } catch (error) {
    createError();
  }
};

window.createCustomer = async () => {
  if (validator.validateFields()) {
    const body = {
      name: document.querySelector("#name-input").value,
      email: document.querySelector("#email-input").value,
      phone: document.querySelector("#phone-input").value,
      cpf: document.querySelector("#cpf-input").value,
    };

    let response;

    try {
      response = await api.post("Customer", body);

      if (!response.success) throw "Error";

      router.handle("/pages/lista-de-clientes.html");

      alert(response.data.message);
    } catch (error) {
      alert(response.notifications[0].message);
    }
  }
};

window.handleCustomerDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar o cliente?");

  if (answer) {
    let response;

    try {
      response = await api.delete("Customer", id);

      if (!response.success) throw "Error";

      router.handle(`/pages/lista-de-clientes.html`);

      alert(response.data.message);
    } catch (error) {
      alert(response.notifications[0].message);
    }
  }
};

window.handleCustomerEdit = async (id) => {
  router.handle("/pages/adicionar-cliente.html", `/atualizar-cliente?id=${id}`);

  let response;

  try {
    response = await api.getById("Customer", id);

    if (!response.success) throw "Error";

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
  } catch (error) {
    alert("Um erro inesperado aconteceu. Tente novamente mais tarde.");
  }
};

window.updateCustomer = async () => {
  if (validator.validateFields()) {
    const urlParams = new URLSearchParams(window.location.search);

    const body = {
      id: urlParams.get("id"),
      name: document.querySelector("#name-input").value,
      email: document.querySelector("#email-input").value,
      phone: document.querySelector("#phone-input").value,
      cpf: document.querySelector("#cpf-input").value,
    };

    let response;

    try {
      response = await api.put("Customer", body);

      if (!response.success) throw "Error";

      router.handle("/pages/lista-de-clientes.html");

      alert(response.data.message);
    } catch (error) {
      alert(response.notifications[0].message);
    }
  }
};
