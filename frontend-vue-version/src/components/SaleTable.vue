<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de vendas</h1>
        <div class="header__search">
          <label class="sr-only" for="search-button">Buscar vendas...</label>
          <input
            type="text"
            name="search-button"
            id="search-button"
            class="header__search-button"
            placeholder="Buscar vendas..."
          />
        </div>
      </div>
      <div class="component__table-wrapper">
        <table class="component__table">
          <tr>
            <th>Cliente</th>
            <th>Qtd. itens</th>
            <th>Data da venda</th>
            <th>Data faturamento</th>
            <th>Valor total</th>
            <th>Ações</th>
          </tr>
          <template v-for="sale in state.sales" :key="sale.id">
            <tr>
              <td class="table--left-corner">{{ sale.customer }}</td>
              <td>{{ sale.quantityItems }}</td>
              <td>{{ toLocaleDateString(sale.saleDate) }}</td>
              <td>{{ toLocaleDateString(sale.billingDate) }}</td>
              <td>{{ toLocaleString(sale.totalValue) }}</td>
              <td class="table--right-corner">
                <button
                  @click="handleDelete(sale.id)"
                  class="table__button table__button--delete"
                >
                  Deletar
                </button>
                <button
                  @click="handleEdit(sale.id)"
                  class="table__button table__button--edit"
                >
                  Editar
                </button>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { api } from "../services/api.js";
import { toLocaleDateString, toLocaleString } from "../helpers/index.js";
import { reactive, onMounted } from "vue";
import router from "../router";

async function updateTable() {
  const response = await api.get("Sale");
  state.sales = response.data;
}

async function handleDelete(id) {
  const answer = confirm("Deseja realmente deletar a venda?");

  if (answer) {
    const response = await api.delete("Sale", id);

    updateTable();

    alert(response.data.message);
  }
}

async function handleEdit(id) {
  router.push(`/atualizar-venda?id=${id}`);
}

const state = reactive({
  sales: null,
});

onMounted(async () => {
  updateTable();
});
</script>

<style scoped>
.component__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.component__header h1 {
  margin-left: 0;
  font-size: 2.4rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.header__search-button {
  background: url(../assets/svg/search-icon.svg) no-repeat scroll 7px 7px;
  background-position: center;
  background-position-x: calc(100% - 12px);
  background-color: var(--background-secondary);
  color: var(--text-secondary);

  font-size: 1.6rem;

  border: 1px solid var(--border);
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.9rem 1.8rem;

  width: 38.8rem;
  height: 4.1rem;
}
</style>
