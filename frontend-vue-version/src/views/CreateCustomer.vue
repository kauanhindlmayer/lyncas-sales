<template>
  <div class="main">
    <Header>
      <HeaderButton title="Voltar" path="/lista-de-clientes" />
    </Header>
    <CustomerForm />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import CustomerForm from "../components/CustomerForm.vue";
</script>
