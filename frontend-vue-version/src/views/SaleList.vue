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
import AppMenu from "../components/Menu.vue";
import AppHeader from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import SalesTable from "../components/SaleTable.vue";

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
