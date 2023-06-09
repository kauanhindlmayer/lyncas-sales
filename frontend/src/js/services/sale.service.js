import { api } from "./api.service.js";
import { router } from "../router/router.js";
import {
  toLocaleDate,
  toLocaleCurrency,
  createError,
  removeLoading,
  validator,
  alertError,
  pageSize,
  fillSelect,
  paginate,
} from "../helper.js";

export const createSaleTable = async (resource) => {
  document.querySelector(".component__table tbody").innerHTML = "";

  const response = await api.get(`Sale/listar?Limit=${pageSize}${resource}`);

  if (!response.success || response.data.sales.length === 0) {
    createError();
    return;
  }

  for (let sale of response.data.sales) {
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

    const tr = document.createElement("tr");
    tr.innerHTML = template;
    document.querySelector(".component__table tbody").appendChild(tr);
  }

  removeLoading();
};

window.createSale = async () => {
  if (validator.validateFields()) {
    const body = {
      customerId: document.querySelector("#customer").value,
      billingDate: document.querySelector("#billing-date").value,
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

  await fillSelect();

  const title = document.querySelector("#title");
  title.innerHTML = `${title.innerHTML.replace("Adicionar", "Atualizar")}`;

  document.querySelector("#customer").value = response.data.customerId;
  document.querySelector("#billing-date").value =
    response.data.billingDate.slice(0, 10);

  for (let [i, sale] of response.data.items.entries()) {
    if (i > 0) plusItems();
    document.querySelectorAll("#description")[i].value = sale.itemDescription;
    document.querySelectorAll("#value")[i].value = sale.unitaryValue;
    document.querySelectorAll("#quantity")[i].value = sale.quantity;
    document.querySelectorAll("#total-value")[i].value = sale.totalValue;
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
      customerId: document.querySelector("#customer").value,
      billingDate: document.querySelector("#billing-date").value,
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

  const forms = document.querySelectorAll(".form__form-wrapper");
  const template = document.createElement("div");

  template.innerHTML = `
    <div class="form__item">
      <div class="form__dashed"></div>
      <div class="form__form-wrapper">${forms[1].innerHTML}</div>
      <div class="form__form-wrapper">${forms[2].innerHTML}</div>
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

window.searchSales = async () => {
  const searchInput = document.querySelector(".header__search-button");
  const filterSelect = document.querySelector(".header__select");
  let param = filterSelect.value;
  let value = searchInput.value;

  if (!param) {
    filterSelect.focus();
    return;
  }

  if (param === "SaleDate" || param === "BillingDate") {
    const splitedDate = searchInput.value.split("/");
    value = [splitedDate[1], splitedDate[0], splitedDate[2]].join("-");

    if (!searchInput.value) value = "";

    if (searchInput.value.length > 0 && searchInput.value.length < 10) {
      alert("A data precisa ser preenchida no formato 'dd/mm/aaaa'.");
      return;
    }
  }

  paginate("Sale", `&${param}=${value}`);
};

const getItems = () => {
  const items = [];
  const quantityItems = document.querySelectorAll("#description").length;

  for (let i = 0; i < quantityItems; i++) {
    items.push({
      itemDescription: document.querySelectorAll("#description")[i].value,
      unitaryValue: document.querySelectorAll("#value")[i].value,
      quantity: document.querySelectorAll("#quantity")[i].value,
      totalValue: document.querySelectorAll("#total-value")[i].value,
    });
  }

  return items;
};

const updateTotalValue = () => {
  let amount = 0;

  const quantity = document.querySelectorAll("#quantity");
  const unitaryValue = document.querySelectorAll("#value");
  const totalValue = document.querySelectorAll("#total-value");

  for (let i = 0; i < quantity.length; i++) {
    const itemTotalValue = quantity[i].value * unitaryValue[i].value;

    if (quantity[i].value && unitaryValue[i].value)
      totalValue[i].value = itemTotalValue;

    amount += itemTotalValue;
  }

  document.querySelector(".footer__total-value").innerHTML =
    toLocaleCurrency(amount);
};
