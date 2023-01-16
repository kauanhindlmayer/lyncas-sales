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
      items: [
        {
          itemDescription: document.querySelector("#description-input").value,
          unitaryValue: document.querySelector("#value-input").value,
          quantity: document.querySelector("#quantity-input").value,
          totalValue: document.querySelector("#total-value-input").value,
        },
      ],
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
  document.querySelector("#description-input").value =
    response.data.items[0].itemDescription;
  document.querySelector("#value-input").value =
    response.data.items[0].unitaryValue;
  document.querySelector("#quantity-input").value =
    response.data.items[0].quantity;
  document.querySelector("#total-value-input").value =
    response.data.items[0].totalValue;

  document.querySelector(".footer__total-value").innerHTML =
    response.data.items[0].totalValue.toLocaleString("pt-BR", {
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
      items: [
        {
          itemDescription: document.querySelector("#description-input").value,
          unitaryValue: document.querySelector("#value-input").value,
          quantity: document.querySelector("#quantity-input").value,
          totalValue: document.querySelector("#total-value-input").value,
        },
      ],
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

  const totalValue = document.querySelector("#total-value-input");
  document.querySelector(".footer__total-value").innerHTML = toLocaleString(
    Number(totalValue.value)
  );
};
