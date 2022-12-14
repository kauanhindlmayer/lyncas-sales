import { append, createError } from "../helper.js";
import { Api } from "./api.js";

export const createSaleTable = async () => {
  const api = new Api();
  const response = await api.get("Sale");

  for (let sale of response.data) {
    const template = `
    <td class="table--left-corner">${sale.customer}</td>
    <td>${sale.quantityItems}</td>
    <td>${sale.saleDate.slice(0,10)}</td>
    <td>${sale.billingDate.slice(0,10)}</td>
    <td>${sale.totalValue}</td>
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

  if (!response.success || response.data.length == 0) createError();
};
