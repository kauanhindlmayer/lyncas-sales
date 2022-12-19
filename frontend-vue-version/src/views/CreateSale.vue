<template>
  <div class="main">
    <Header>
      <HeaderButton title="Voltar" path="/lista-de-vendas" />
    </Header>
    <SaleForm />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import SaleForm from "../components/SaleForm.vue";
</script>
