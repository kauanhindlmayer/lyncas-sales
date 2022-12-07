<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de vendas</h1>
        <SearchInput title="Buscar vendas..." />
      </div>
      <div class="component__table">
        <table>
          <tr>
            <th>Cliente</th>
            <th>Qtd. itens</th>
            <th>Data da venda</th>
            <th>Data faturamento</th>
            <th>Valor total</th>
            <th>Ações</th>
          </tr>
          <template v-for="x in 6" :key="x">
            <SalesTableRow
              name="Genara Sousa"
              quantity="1"
              sale-date="14/05/2022"
              billing-date="14/05/2022"
              total-value="R$ 90,00"
            />
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import SalesTableRow from "./SalesTableRow.vue";
import SearchInput from "./SearchInput.vue";
</script>
