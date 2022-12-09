import { Api } from "./services/api.js";
import { Router } from "./router.js";
import { table, customersButton, main } from "./elements.js";

const router = new Router();

const api = new Api();
const response = api.get("Customer");

const template = `
  <td class="table--left-corner">Teste</td>
  <td>Teste</td>
  <td>Teste</td>
  <td>Teste</td>
  <td class="table--right-corner">
    <button class="table__button table__button--delete">Deletar</button>
    <button class="table__button table__button--edit">Editar</button>
  </td>
`;

// const mutationObserver = new MutationObserver(entries => {
//   console.log(entries);
//   createRow();
// })

// mutationObserver.observe(main, { childList: true });

// customersButton.addEventListener("click", (event) => {
//   router.route(event);
// });

const createRow = () => {
  const tr = document.createElement("tr");
  tr.innerHTML = template;
  table.appendChild(tr);
};
