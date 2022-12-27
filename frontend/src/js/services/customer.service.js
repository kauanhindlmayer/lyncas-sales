import { api } from "./api.service.js";
import { router } from "../router/router.js";
import { append, createError, removeLoading, validator } from "../helper.js";

export const createCustomerTable = async () => {
  const response = await api.get("Customer");

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

  if (response.success) removeLoading();
  if (!response.success || response.data.length <= 0) createError();
};

const createCustomer = async () => {
  if (validator.handleSubmit()) {
    const body = {
      name: document.querySelector("#name-input").value,
      email: document.querySelector("#email-input").value,
      phone: document.querySelector("#phone-input").value,
      cpf: document.querySelector("#cpf-input").value,
    };

    const response = await api.post("Customer", body);

    router.handle("/pages/lista-de-clientes.html");

    alert(response.data.message);
  }
};

window.createCustomer = () => createCustomer();

const handleCustomerDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar o cliente?");

  if (answer) {
    const response = await api.delete("Customer", id);

    router.handle(`/pages/lista-de-clientes.html`);

    alert(response.data.message);
  }
};

window.handleCustomerDelete = (id) => handleCustomerDelete(id);

const handleCustomerEdit = async (id) => {
  router.handle("/pages/adicionar-cliente.html", `/atualizar-cliente?id=${id}`);

  const response = await api.getById("Customer", id);

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

window.handleCustomerEdit = (id) => handleCustomerEdit(id);

const updateCustomer = async () => {
  if (validator.handleSubmit()) {
    const urlParams = new URLSearchParams(window.location.search);

    const body = {
      id: urlParams.get("id"),
      name: document.querySelector("#name-input").value,
      email: document.querySelector("#email-input").value,
      phone: document.querySelector("#phone-input").value,
      cpf: document.querySelector("#cpf-input").value,
    };

    const response = await api.put("Customer", body);

    router.handle("/pages/lista-de-clientes.html");

    alert(response.data.message);
  }
};

window.updateCustomer = () => updateCustomer();
