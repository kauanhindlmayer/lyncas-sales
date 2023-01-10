<template>
  <div class="container">
    <Menu />
    <div class="main">
      <Header>
        <HeaderButton title="Voltar" path="/lista-de-clientes" />
      </Header>
      <CustomerForm />
    </div>
  </div>
</template>

<script setup>
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import CustomerForm from "../components/CustomerForm.vue";
</script>
