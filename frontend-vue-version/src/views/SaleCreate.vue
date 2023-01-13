<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" path="/lista-de-vendas" />
      </app-header>
      <sale-form />
    </div>
  </div>
</template>

<script>
import AppMenu from "../components/Menu.vue";
import AppHeader from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import SaleForm from "../components/SaleForm.vue";

export default {
  name: "SaleCreate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    SaleForm,
  },
};
</script>
