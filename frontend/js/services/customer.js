import { Api } from "../services/api.js";
import { append } from "../helper.js";

const createRowCustomer = (response) => {
  for (let customer of response.data) {
    const template = `
    <td class="table--left-corner">${customer.name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.cpf}</td>
    <td class="table--right-corner">
      <button class="table__button table__button--delete">Deletar</button>
      <button class="table__button table__button--edit">Editar</button>
    </td>
  `;

    append(template);
  }
};

const handleMutation = async () => {
  const api = new Api();
  const { pathname } = window.location;
  const response = await api.get(
    `${pathname === "/lista-de-clientes" ? "Customer" : "Sale"}`
  );

  pathname === "/lista-de-clientes"
    ? createRowCustomer(response)
    : createRowSale(response);

  if (!response.success || response.data.length == 0) {
    document.querySelector(".spinner__picture").classList.add("hide");
    defaultMessage.classList.remove("hide");
  }

  if (response.success) {
    document.querySelector(".spinner__picture").classList.add("hide");
  }
};

const mutationObserver = new MutationObserver(handleMutation);

mutationObserver.observe(document.querySelector(".main"), { childList: true });

const handleDelete = () => {
  confirm("Deseja realmente deletar?");
};

window.handleDelete = () => handleDelete();
