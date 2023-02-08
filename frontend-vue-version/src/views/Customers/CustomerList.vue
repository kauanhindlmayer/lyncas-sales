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
import AppMenu from "@/layouts/Menu.vue";
import AppHeader from "@/layouts/Header.vue";
import HeaderButton from "@/layouts/HeaderButton.vue";
import CustomerTable from "@/views/Customers/components/CustomerTable.vue";

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
