<template>
  <div class="menu">
    <img
      alt="Lyncas logo"
      class="menu__item--logo"
      src="@/assets/svg/logo.svg"
    />

    <nav>
      <router-link class="menu__item menu__item--dashboard" to="/dashboard">
        <img
          class="menu__item__icon"
          src="/src/assets/svg/dashboard-icon.svg"
          alt="Dashboard Icon"
        />
        Dashboard
      </router-link>

      <router-link
        class="menu__item menu__item--customers"
        to="/lista-de-clientes"
      >
        <img
          class="menu__item__icon"
          src="/src/assets/svg/customer-icon.svg"
          alt="Customer Icon"
        />
        Clientes
      </router-link>

      <router-link class="menu__item menu__item--sales" to="/lista-de-vendas">
        <img
          class="menu__item__icon"
          src="/src/assets/svg/sale-icon.svg"
          alt="Sale Icon"
        />
        Vendas
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppMenu",
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

.menu__item {
  color: var(--background-secondary);

  width: 12.6rem;
  margin-bottom: 1.4rem;

  border: 1px solid var(--border-blue);
  border-radius: 4px;

  display: flex;
  align-items: center;

  position: absolute;
}

.menu__item span a {
  color: var(--background-secondary);
  text-decoration: none;
}

.menu__item:hover {
  background-color: var(--border-blue);
  filter: brightness(0.9);
}

.menu__item__icon {
  width: 1.6rem;
  height: 1.6rem;
  margin: 0.9rem 1.2rem;
}

.menu__item--dashboard {
  left: 1.75rem;
  top: calc(50% - 4.9rem);
}

.menu__item--customers {
  left: 1.75rem;
  top: 50%;
}

.menu__item--sales {
  left: 1.75rem;
  top: calc(50% + 4.9rem);
}

.menu__item--active {
  background-color: var(--border-blue);
}
</style>
