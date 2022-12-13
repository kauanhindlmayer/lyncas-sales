import { append } from "../helper.js";

export const createCustomerRow = (response) => {
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
};

const handleDelete = () => {
  confirm("Deseja realmente deletar?");
};

window.handleDelete = () => handleDelete();
