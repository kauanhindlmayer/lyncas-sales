<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" routeName="sales-list" />
      </app-header>
      <sale-form :updateUnsavedFlag="updateUnsavedFlag" />
    </div>
  </div>
</template>

<script>
import AppMenu from "../components/Menu.vue";
import AppHeader from "../components/Header.vue";
import HeaderButton from "../components/HeaderButton.vue";
import SaleForm from "../components/SaleForm.vue";
import checkUnsaved from "../middlewares/checkUnsaved.js";

export default {
  name: "SaleCreate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    SaleForm,
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
