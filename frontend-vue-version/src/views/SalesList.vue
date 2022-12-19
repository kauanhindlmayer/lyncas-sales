<template>
  <div class="main">
    <Header>
      <HeaderButton title="Adicionar" path="/adicionar-venda" />
    </Header>
    <SalesTable />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import SalesTable from "../components/SalesTable.vue";
</script>
