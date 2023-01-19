import { api } from "./api.service.js";
import { router } from "../router/router.js";
import {
  append,
  toLocaleDateString,
  toLocaleString,
  createError,
  removeLoading,
  validator,
  preventNumbers,
} from "../helper.js";

export const createSaleTable = async () => {
  const response = await api.get("Sale/listar");

  if (!response.success || response.data.length === 0) {
    createError();
    return;
  }

  for (let sale of response.data) {
    const template = `
    <td class="table--left-corner">${sale.customer}</td>
    <td>${sale.quantityItems}</td>
    <td>${toLocaleDateString(sale.saleDate)}</td>
    <td>${toLocaleDateString(sale.billingDate)}</td>
    <td>${toLocaleString(sale.totalValue)}</td>
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

  removeLoading();
};

window.createSale = async () => {
  if (validator.validateFields()) {
    const body = {
      customerId: document.querySelector("#customer-input").value,
      billingDate: document.querySelector("#billing-date-input").value,
      items: getItems(),
    };

    const response = await api.post("Sale/adicionar", body);

    if (!response.success) {
      alert(response.notifications[0].message);
      return;
    }

    router.handle("/pages/lista-de-vendas.html");

    alert(response.data.message);
  }
};

window.handleSaleDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar a venda?");

  if (answer) {
    const response = await api.delete(`Sale/remover/${id}`);

    if (!response.success) {
      alert(response.notifications[0].message);
      return;
    }

    router.handle(`/pages/lista-de-vendas.html`);

    alert(response.data.message);
  }
};

window.handleSaleEdit = async (id) => {
  router.handle("/pages/adicionar-venda.html", `/atualizar-venda?id=${id}`);

  const response = await api.get(`Sale/obter/${id}`);

  if (!response.success) {
    alert("Um erro inesperado aconteceu. Tente novamente mais tarde.");
    return;
  }

  document.querySelector("#title").innerHTML = `${document
    .querySelector("#title")
    .innerHTML.replace("Adicionar", "Atualizar")}`;

  document.querySelector("#customer-input").value = response.data.customerId;
  document.querySelector("#billing-date-input").value =
    response.data.billingDate.slice(0, 10);

  for (let i = 0; i < response.data.items.length - 1; i++) plusItems();

  for (let i = 0; i < response.data.items.length; i++) {
    document.querySelectorAll("#description-input")[i].value =
      response.data.items[i].itemDescription;
    document.querySelectorAll("#value-input")[i].value =
      response.data.items[i].unitaryValue;
    document.querySelectorAll("#quantity-input")[i].value =
      response.data.items[i].quantity;
    document.querySelectorAll("#total-value-input")[i].value =
      response.data.items[i].totalValue;
  }

  document.querySelector(".footer__total-value").innerHTML =
    getTotalValue().toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  document
    .querySelector(".save-button")
    .setAttribute("onclick", "updateSale()");
};

window.updateSale = async () => {
  if (validator.validateFields()) {
    const urlParams = new URLSearchParams(window.location.search);
    
    const body = {
      id: urlParams.get("id"),
      customerId: document.querySelector("#customer-input").value,
      billingDate: document.querySelector("#billing-date-input").value,
      items: getItems(),
    };

    const response = await api.put("Sale/atualizar", body);

    if (!response.success) {
      alert(response.notifications[0].message);
      return;
    }

    router.handle("/pages/lista-de-vendas.html");

    alert(response.data.message);
  }
};

window.handleUpdatePrice = (input) => {
  preventNumbers(input);

  document.querySelector(".footer__total-value").innerHTML = toLocaleString(
    getTotalValue()
  );
};

window.plusItems = (event) => {
  if (event) event.preventDefault();
  const formulary = document.querySelectorAll(".form__form-wrapper");

  const template = document.createElement("div");

  template.innerHTML = `
    <div class="form__dashed"></div>
    <div class="form__form-wrapper">${formulary[1].innerHTML}</div>
    <div class="form__form-wrapper">${formulary[2].innerHTML}</div>
  `;

  document.querySelector(".form__items").appendChild(template);
};

const getTotalValue = () => {
  let totalValue = 0;

  const inputs = document.querySelectorAll("#total-value-input");

  for (let input of inputs) totalValue += Number(input.value);

  return totalValue;
};

const getItems = () => {
  const items = [];
  const quantityItems = document.querySelectorAll("#description-input").length;

  for (let i = 0; i < quantityItems; i++) {
    items.push({
      itemDescription: document.querySelectorAll("#description-input")[i].value,
      unitaryValue: document.querySelectorAll("#value-input")[i].value,
      quantity: document.querySelectorAll("#quantity-input")[i].value,
      totalValue: document.querySelectorAll("#total-value-input")[i].value,
    });
  }

  return items;
};
