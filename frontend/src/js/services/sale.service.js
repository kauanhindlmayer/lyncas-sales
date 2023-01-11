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
  let response;

  try {
    const response = await api.get("Sale");

    if (!response.success) throw "Error";

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
  } catch (error) {
    alert("Um erro inesperado aconteceu. Tente novamente mais tarde.");
    createError();
  }
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

    let response;

    try {
      response = await api.post("Sale", body);

      if (!response.success) throw "Error";

      router.handle("/pages/lista-de-vendas.html");

      alert(response.data.message);
    } catch (error) {
      alert(response.notifications[0].message);
    }
  }
};

window.handleSaleDelete = async (id) => {
  const answer = confirm("Deseja realmente deletar a venda?");

  if (answer) {
    let response;

    try {
      response = await api.delete("Sale", id);

      if (!response.success) throw "Error";

      router.handle(`/pages/lista-de-vendas.html`);

      alert(response.data.message);
    } catch (error) {
      alert(response.notifications[0].message);
    }
  }
};

window.handleSaleEdit = async (id) => {
  router.handle("/pages/adicionar-venda.html", `/atualizar-venda?id=${id}`);

  let response;

  try {
    response = await api.getById("Sale", id);

    if (!response.success) throw "Error";

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
  } catch (error) {
    alert("Um erro inesperado aconteceu. Tente novamente mais tarde.");
  }
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

    let response;

    try {
      response = await api.put("Sale", body);

      if (!response.success) throw "Error";

      router.handle("/pages/lista-de-vendas.html");

      alert(response.data.message);
    } catch (error) {
      alert(response.notifications[0].message);
    }
  }
};

window.handleUpdatePrice = (input) => {
  preventNumbers(input);

  const totalValue = document.querySelector("#total-value-input");
  document.querySelector(".footer__total-value").innerHTML = toLocaleString(
    Number(totalValue.value)
  );
};
