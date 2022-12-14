import { append } from "../helper.js";
import { Api } from "./api.js";

export const createCustomerTable = async () => {
  const api = new Api();
  const response = await api.get("Customer");

  for (let customer of response.data) {
    const template = `
    <td class="table--left-corner">${customer.name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.cpf}</td>
    <td class="table--right-corner">
      <button onclick="handleDelete()" class="table__button table__button--delete">Deletar</button>
      <button onclick="handleEdit()" class="table__button table__button--edit">Editar</button>
    </td>
  `;

    append(template);
  }

  if (response.success) {
    document.querySelector(".spinner").classList.add("hide");
    document.querySelector(".default-message").classList.add("hide");
  }
};

export const createCustomer = async () => {
  const body = {
    name: document.querySelector("#name-input").value,
    email: document.querySelector("#email-input").value,
    phone: document.querySelector("#phone-input").value,
    cpf: document.querySelector("#cpf-input").value,
  };

  const api = new Api();
  const response = await api.post("Customer", body);

  console.log(response);
};

const handleDelete = () => {
  confirm("Deseja realmente deletar?");
};

window.handleDelete = () => handleDelete();
