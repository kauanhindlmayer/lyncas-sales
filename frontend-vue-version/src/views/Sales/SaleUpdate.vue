<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" routeName="sales-list" />
      </app-header>
      <update-sale-form :updateUnsavedFlag="updateUnsavedFlag" />
    </div>
  </div>
</template>

<script>
import AppMenu from "../../components/layouts/Menu.vue";
import AppHeader from "../../components/layouts/Header.vue";
import HeaderButton from "../../components/layouts/HeaderButton.vue";
import UpdateSaleForm from "./components/SaleUpdateForm.vue";
import checkUnsaved from "../middlewares/checkUnsaved.js";

export default {
  name: "SaleUpdate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    UpdateSaleForm,
  },
  data() {
    return {
      unsavedFlag: false,
    };
  },
  methods: {
    checkUnsaved,
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    checkUnsaved(next, this.unsavedFlag);
  },
};
</script>
