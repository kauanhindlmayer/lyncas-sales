import { Api } from "./api.js";
import { append, createError, removeLoading } from "../helper.js";
import { Router } from "../router/router.js";

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
      <button 
        onclick="handleSaleDelete('${sale.id}')" 
        class="table__button table__button--delete"
      >
        Deletar
      </button>

      <button 
        onclick="handleSaleEdit('${sale.id}')" 
        class="table__button table__button--edit"
      >
        Editar
      </button>
    </td>
  `;

    append(template);
  }

  response.success ? removeLoading() : createError();
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

const handleSaleDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar a venda?");

  if (answer) {
    await api.delete("Sale", id);
    const router = new Router();
    router.handle(`/pages/lista-de-vendas.html`);
  }
};

window.handleSaleDelete = (id) => handleSaleDelete(id);

const handleSaleEdit = async (id) => {
  const router = new Router();
  router.handle("/pages/adicionar-venda.html", `/atualizar-venda?id=${id}`);
};

window.handleSaleEdit = (id) => handleSaleEdit(id);

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
