<template>
  <div class="main">
    <Header>
      <HeaderButton title="Adicionar" path="/adicionar-cliente" />
    </Header>
    <CustomerTable />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import CustomerTable from "../components/CustomersTable.vue";
</script>
