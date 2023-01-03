<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de vendas</h1>
        <SearchInput title="Buscar vendas..." />
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
                <DeleteButton />
                <EditButton />
              </td>
            </tr>
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import SearchInput from "./SearchInput.vue";
import DeleteButton from "./DeleteButton.vue";
import EditButton from "./EditButton.vue";
import { api } from "../services/api.js";
import { toLocaleDateString, toLocaleString } from "../includes/helper.js";
import { reactive, onMounted } from "vue";

const state = reactive({
  sales: null,
});

onMounted(async () => {
  const response = await api.get("Sale");
  state.sales = response.data;
});
</script>
