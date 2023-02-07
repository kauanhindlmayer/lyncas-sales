<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" routeName="customers-list" />
      </app-header>
      <update-customer-form :updateUnsavedFlag="updateUnsavedFlag" />
    </div>
  </div>
</template>

<script>
import AppMenu from "../../components/layouts/Menu.vue";
import AppHeader from "../../components/layouts/Header.vue";
import HeaderButton from "../../components/layouts/HeaderButton.vue";
import UpdateCustomerForm from "./components/CustomerUpdateForm.vue";
import checkUnsaved from "../middlewares/checkUnsaved.js";

export default {
  name: "CustomerUpdate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    UpdateCustomerForm,
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
