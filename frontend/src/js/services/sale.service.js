import { api } from "./api.service.js";
import { router } from "../router/router.js";
import {
  append,
  createError,
  removeLoading,
  options,
  validator,
} from "../helper.js";

export const createSaleTable = async () => {
  const response = await api.get("Sale");

  for (let sale of response.data) {
    const saleDateInput = sale.saleDate.slice(0, 10);
    const billingDateInput = sale.billingDate.slice(0, 10);

    const saleDate = new Date(saleDateInput);
    const billingDate = new Date(billingDateInput);

    const template = `
    <td class="table--left-corner">${sale.customer}</td>
    <td>${sale.quantityItems}</td>
    <td>${saleDate.toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
    <td>${billingDate.toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
    <td>${sale.totalValue.toLocaleString("pt-BR", options)}</td>
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

  if (response.success) removeLoading();
  if (!response.success || response.data.length <= 0) createError();
};

const createSale = async () => {
  if (validator.handleSubmit()) {
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

    const response = await api.post("Sale", body);

    router.handle("/pages/lista-de-vendas.html");

    alert(response.data.message);
  }
};

window.createSale = () => createSale();

const handleSaleDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar a venda?");

  if (answer) {
    const response = await api.delete("Sale", id);

    router.handle(`/pages/lista-de-vendas.html`);

    alert(response.data.message);
  }
};

window.handleSaleDelete = (id) => handleSaleDelete(id);

const handleSaleEdit = async (id) => {
  router.handle("/pages/adicionar-venda.html", `/atualizar-venda?id=${id}`);

  const response = await api.getById("Sale", id);

  document.querySelector("#title").innerHTML = `${document
    .querySelector("#title")
    .innerHTML.replace("Adicionar", "Atualizar")}`;

  document.querySelector("#customer-input").value = response.data.customerId;
  document.querySelector("#billing-date-input").value =
    response.data.billingDate.slice(0, 10);
  document.querySelector("#description-input").value =
    response.data.items[0].itemDescription;
  document.querySelector("#value-input").value =
    response.data.items[0].unitaryValue;
  document.querySelector("#quantity-input").value =
    response.data.items[0].quantity;
  document.querySelector("#total-value-input").value =
    response.data.items[0].totalValue;

  document.querySelector(".footer__total-value").innerHTML =
    response.data.items[0].totalValue.toLocaleString("pt-BR", options);

  document
    .querySelector(".save-button")
    .setAttribute("onclick", "updateSale()");
};

window.handleSaleEdit = (id) => handleSaleEdit(id);

const updateSale = async () => {
  if (validator.handleSubmit()) {
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

    const response = await api.put("Sale", body);

    router.handle("/pages/lista-de-vendas.html");

    alert(response.data.message);
  }
};

window.updateSale = () => updateSale();

const handleUpdatePrice = () => {
  const totalValue = document.querySelector("#total-value-input");
  document.querySelector(".footer__total-value").innerHTML = Number(
    totalValue.value
  ).toLocaleString("pt-BR", options);
};

window.handleUpdatePrice = () => handleUpdatePrice();
