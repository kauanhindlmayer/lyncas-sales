import { api } from "./api.service.js";
import { router } from "../router/router.js";
import {
  append,
  toLocaleDate,
  toLocaleCurrency,
  createError,
  removeLoading,
  validator,
  alertError,
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
    <td>${toLocaleDate(sale.saleDate)}</td>
    <td>${toLocaleDate(sale.billingDate)}</td>
    <td>${toLocaleCurrency(sale.totalValue)}</td>
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
      alertError(response);
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
      alertError(response);
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

  for (let saleIndex = 0; saleIndex < response.data.items.length; saleIndex++) {
    if (saleIndex > 0) plusItems();

    document.querySelectorAll("#description-input")[saleIndex].value =
      response.data.items[saleIndex].itemDescription;
    document.querySelectorAll("#value-input")[saleIndex].value =
      response.data.items[saleIndex].unitaryValue;
    document.querySelectorAll("#quantity-input")[saleIndex].value =
      response.data.items[saleIndex].quantity;
    document.querySelectorAll("#total-value-input")[saleIndex].value =
      response.data.items[saleIndex].totalValue;
  }

  updateTotalValue();

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
      alertError(response);
      return;
    }

    router.handle("/pages/lista-de-vendas.html");

    alert(response.data.message);
  }
};

window.plusItems = (event) => {
  if (event) event.preventDefault();
  const formulary = document.querySelectorAll(".form__form-wrapper");

  const template = document.createElement("div");

  template.innerHTML = `
    <div class="form__item">
      <div class="form__dashed"></div>
      <div class="form__form-wrapper">${formulary[1].innerHTML}</div>
      <div class="form__form-wrapper">${formulary[2].innerHTML}</div>
      <button 
        class="form__button--remove-sales"
        onclick="removeSale(this)"
      >
        Deletar
      </button>
    </div>
  `;

  document.querySelector(".form__items").appendChild(template);
};

window.removeSale = (element) => {
  element.parentElement.remove();

  updateTotalValue();
};

window.restrictInput = (input) => {
  if (input.value.length > input.maxLength)
    input.value = input.value.slice(0, input.maxLength);

  updateTotalValue();
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

const updateTotalValue = () => {
  let totalValue = 0;

  const quantity = document.querySelectorAll("#total-value-input").length;
  const quantityInputs = document.querySelectorAll("#quantity-input");
  const unitaryValueInputs = document.querySelectorAll("#value-input");
  const totalValueInputs = document.querySelectorAll("#total-value-input");

  for (let i = 0; i < quantity; i++) {
    const itemTotalValue =
      quantityInputs[i].value * unitaryValueInputs[i].value;

    if (quantityInputs[i].value && unitaryValueInputs[i].value)
      totalValueInputs[i].value = itemTotalValue;

    totalValue += itemTotalValue;
  }

  document.querySelector(".footer__total-value").innerHTML =
    toLocaleCurrency(totalValue);
};
