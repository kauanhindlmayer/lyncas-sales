import { append } from "../helper.js";

export const createSaleRow = (response) => {
  for (let sale of response.data) {
    const template = `
    <td class="table--left-corner">${sale.CustomerName}</td>
    <td>${sale.quantityItems}</td>
    <td>${sale.saleDate}</td>
    <td>${sale.billingDate}</td>
    <td>${sale.totalValue}</td>
    <td class="table--right-corner">
      <button onclick="handleDelete()" class="table__button table__button--delete">Deletar</button>
      <button onclick="handleEdit()" class="table__button table__button--edit">Editar</button>
    </td>
  `;

    append(template);
  }
};
