<template>
  <div class="menu">
    <img
      alt="Lyncas logo"
      class="menu__item--logo"
      src="@/assets/svg/logo.svg"
    />

    <nav>
      <MenuItem path="/dashboard" name="Dashboard" modifier="dashboard" />
      <MenuItem
        path="/lista-de-clientes"
        name="Clientes"
        modifier="customers"
      />
      <MenuItem path="/lista-de-vendas" name="Vendas" modifier="sales" />
    </nav>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  name: "AppMenu",
  components: {
    MenuItem,
  },
};
</script>

<style scoped>
.menu {
  background-color: var(--primary-color);
  display: flex;
}

.menu__item--logo {
  width: 10.6rem;
  height: 2.4rem;

  position: absolute;
  top: 7.6rem;
  left: 3.5rem;
}
</style>
