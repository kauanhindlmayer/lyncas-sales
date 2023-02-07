<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Adicionar" routeName="create-sale" />
      </app-header>
      <sales-table />
    </div>
  </div>
</template>

<script>
import AppMenu from "../../components/layouts/Menu.vue";
import AppHeader from "../../components/layouts/Header.vue";
import HeaderButton from "../../components/layouts/HeaderButton.vue";
import SalesTable from "./components/SaleTable.vue";

export default {
  name: "SaleList",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    SalesTable,
  },
};
</script>
