<template>
  <div class="container">
    <Menu />
    <div class="main">
      <Header>
        <HeaderButton title="Adicionar" path="/adicionar-venda" />
      </Header>
      <SalesTable />
    </div>
  </div>
</template>

<script setup>
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import SalesTable from "../components/SaleTable.vue";
</script>
