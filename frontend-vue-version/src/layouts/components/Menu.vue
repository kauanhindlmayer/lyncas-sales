<template>
  <div class="menu">
    <img
      alt="Lyncas logo"
      class="menu__item--logo"
      src="@/assets/svg/logo.svg"
    />

    <nav>
      <router-link
        class="menu__item menu__item--dashboard"
        :to="{ name: 'dashboard' }"
      >
        <img
          class="menu__item__icon"
          src="@/assets/svg/dashboard-icon.svg"
          alt="Dashboard Icon"
        />
        {{ $t("GENERAL.DASHBOARD") }}
      </router-link>

      <router-link
        class="menu__item menu__item--customers"
        :to="{ name: 'customers-list' }"
      >
        <img
          class="menu__item__icon"
          src="@/assets/svg/customer-icon.svg"
          alt="Customer Icon"
        />
        {{ $t("GENERAL.CUSTOMERS") }}
      </router-link>

      <router-link
        class="menu__item menu__item--sales"
        :to="{ name: 'sales-list' }"
      >
        <img
          class="menu__item__icon"
          src="@/assets/svg/sale-icon.svg"
          alt="Sale Icon"
        />
        {{ $t("GENERAL.SALES") }}
      </router-link>
      <a class="current-locale" href="#" @click.prevent="changeLocale">
        {{ currentLocale }}
      </a>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useLocaleStore from "@/stores/locale";

export default {
  name: "AppMenu",
  computed: {
    currentLocale() {
      return this.$i18n.locale === "br" ? "Português" : "English";
    },
  },
  methods: {
    ...mapActions(useLocaleStore, ["changeLocale"]),
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  background-color: $primary-color;
}
.menu__item--logo {
  position: absolute;
  top: 7.6rem;
  left: 3.5rem;
  height: 2.4rem;
}
.menu__item {
  position: absolute;
  display: flex;
  align-items: center;
  border: 1px solid $border-blue;
  border-radius: 4px;
  width: 12.6rem;
  margin-bottom: 1.4rem;
  color: $background-secondary;
  span {
    a {
      text-decoration: none;
      color: $background-secondary;
    }
  }
  &:hover {
    background-color: $border-blue;
    filter: brightness(0.9);
  }
}
.menu__item__icon {
  margin: 0.9rem 1.2rem;
  width: 1.6rem;
  height: 1.6rem;
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
  background-color: $border-blue;
}
.current-locale {
  position: absolute;
  left: 5.4rem;
  bottom: 1.75rem;
}
</style>
