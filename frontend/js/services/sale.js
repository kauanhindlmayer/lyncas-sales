import { Api } from "./api.js";
import { Router } from "../router/router.js";
import { append, createError } from "../helper.js";

const api = new Api();

export const createSaleTable = async () => {
  const response = await api.get("Sale");

  for (let sale of response.data) {
    const template = `
    <td class="table--left-corner">${sale.customer}</td>
    <td>${sale.quantityItems}</td>
    <td>${sale.saleDate.slice(0, 10)}</td>
    <td>${sale.billingDate.slice(0, 10)}</td>
    <td>${sale.totalValue}</td>
    <td class="table--right-corner">
      <button onclick="handleDelete('${sale.id}')" class="table__button table__button--delete">Deletar</button>
      <button onclick="handleEdit('${sale.id}')" class="table__button table__button--edit">Editar</button>
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

export const createSale = async () => {
  const body = {
    customerId: document.querySelector("#customer-input").value,
    billingDate: document.querySelector("#billing-date-input").value,
    items: [
      {
        itemDescription: document.querySelector("#description-input").value,
        unitaryValue: document.querySelector("#value-input").value,
        quantity: document.querySelector("#quantity-input").value,
        totalValue: document.querySelector("#total-value-input").value,
      },
    ],
  };

  await api.post("Sale", body);

  const router = new Router();
  router.handle("/pages/lista-de-vendas.html");
};

export const updateSale = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const body = {
    id: urlParams.get("id"),
    customerId: document.querySelector("#customer-input").value,
    billingDate: document.querySelector("#billing-date-input").value,
    items: [
      {
        itemDescription: document.querySelector("#description-input").value,
        unitaryValue: document.querySelector("#value-input").value,
        quantity: document.querySelector("#quantity-input").value,
        totalValue: document.querySelector("#total-value-input").value,
      },
    ],
  };

  await api.put("Sale", body);

  const router = new Router();
  router.handle("/pages/lista-de-vendas.html");
};
