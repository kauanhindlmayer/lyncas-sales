<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Adicionar" routeName="create-customer" />
      </app-header>
      <customer-table />
    </div>
  </div>
</template>

<script>
import AppMenu from "../../components/layouts/Menu.vue";
import AppHeader from "../../components/layouts/Header.vue";
import HeaderButton from "../../components/layouts/HeaderButton.vue";
import CustomerTable from "./components/CustomerTable.vue";

export default {
  name: "CustomerList",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    CustomerTable,
  },
};
</script>
