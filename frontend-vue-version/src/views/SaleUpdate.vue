<template>
  <div class="container">
    <Menu />
    <div class="main">
      <Header>
        <HeaderButton title="Voltar" path="/lista-de-vendas" />
      </Header>
      <UpdateSaleForm />
    </div>
  </div>
</template>

<script setup>
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import UpdateSaleForm from "../components/SaleUpdateForm.vue";
</script>
