<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" routeName="sales-list" />
      </app-header>
      <update-sale-form />
    </div>
  </div>
</template>

<script>
import AppMenu from "../components/Menu.vue";
import AppHeader from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import UpdateSaleForm from "../components/SaleUpdateForm.vue";

export default {
  name: "SaleUpdate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    UpdateSaleForm,
  },
};
</script>
