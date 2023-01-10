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
