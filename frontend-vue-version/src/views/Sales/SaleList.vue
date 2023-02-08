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
import AppMenu from "@/layouts/Menu.vue";
import AppHeader from "@/layouts/Header.vue";
import HeaderButton from "@/layouts/HeaderButton.vue";
import SalesTable from "@/views/Sales/components/SaleTable.vue";

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
