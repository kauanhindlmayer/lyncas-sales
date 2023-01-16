<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" routeName="customers-list" />
      </app-header>
      <customer-form />
    </div>
  </div>
</template>

<script>
import AppMenu from "../components/Menu.vue";
import AppHeader from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import CustomerForm from "../components/CustomerForm.vue";

export default {
  name: "CustomerCreate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    CustomerForm,
  },
};
</script>
