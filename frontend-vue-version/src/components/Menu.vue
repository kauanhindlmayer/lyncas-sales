<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu">
    <img alt="Lyncas logo" class="menu__item--logo" src="@/assets/logo.svg" />

    <nav>
      <MenuItem path="/dashboard" name="Dashboard" />
      <MenuItem path="/lista-de-clientes" name="Clientes" />
      <MenuItem path="/lista-de-vendas" name="Vendas" />
    </nav>
  </div>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
</script>

<style scoped>
.menu {
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu__item--logo {
  width: 10.6rem;
  height: 2.4rem;

  position: absolute;
  top: 7.6rem;
  left: 3.5rem;
}
</style>
