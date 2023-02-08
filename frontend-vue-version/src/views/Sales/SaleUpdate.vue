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
import AppMenu from "@/layouts/Menu.vue";
import AppHeader from "@/layouts/Header.vue";
import HeaderButton from "@/layouts/HeaderButton.vue";
import UpdateSaleForm from "@/views/Sales/components/SaleUpdateForm.vue";
import checkUnsaved from "@/common/middlewares/checkUnsaved.js";

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
