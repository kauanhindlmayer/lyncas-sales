<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" routeName="customers-list" />
      </app-header>
      <update-customer-form />
    </div>
  </div>
</template>

<script>
import AppMenu from "../components/Menu.vue";
import AppHeader from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import UpdateCustomerForm from "../components/CustomerUpdateForm.vue";

export default {
  name: "CustomerUpdate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    UpdateCustomerForm,
  },
};
</script>
