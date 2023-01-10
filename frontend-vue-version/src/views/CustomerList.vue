<template>
  <div class="container">
    <Menu />
    <div class="main">
      <Header>
        <HeaderButton title="Adicionar" path="/adicionar-cliente" />
      </Header>
      <CustomerTable />
    </div>
  </div>
</template>

<script setup>
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import CustomerTable from "../components/CustomerTable.vue";
</script>
