<template>
  <app-header>
    <header-button title="Voltar" routeName="customers-list" />
  </app-header>
  <div class="content">
    <section class="component">
      <h1>{{ title }}</h1>
      <form class="form">
        <div class="form__form-wrapper">
          <input-text
            ref="name"
            label="Nome"
            v-model="customer.name"
            :value="customer.name"
            required
          />
          <input-text
            ref="email"
            label="E-mail"
            v-model="customer.email"
            :value="customer.email"
            email
            required
          />
        </div>
        <div class="form__form-wrapper">
          <input-mask
            ref="phone"
            label="Telefone"
            mask="(99) 9 9999-9999"
            v-model="customer.phone"
            :value="customer.phone"
            minlength="8"
            required
          />
          <input-mask
            ref="cpf"
            label="CPF"
            mask="999.999.999-99"
            v-model="customer.cpf"
            :value="customer.cpf"
            cpf
            required
          />
        </div>
        <div class="align-right">
          <button
            class="save-button save-button--customer"
            type="submit"
            @click.prevent="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useLoaderStore from "@/stores/loader";
import AppHeader from "@/layouts/components/Header.vue";
import HeaderButton from "@/layouts/components/HeaderButton.vue";
import checkUnsaved from "@/common/middlewares/checkUnsaved.js";
import customerService from "@/common/services/customer.service";
import message from "@/common/utils/message.js";
import { InputText, InputMask } from "@/components/inputs";

export default {
  name: "CustomerCreate",
  components: {
    AppHeader,
    HeaderButton,
    InputText,
    InputMask,
  },
  data() {
    return {
      unsavedFlag: false,
      title: "Adicionar cliente",
      customer: {
        id: this.$route.params.id,
        name: null,
        email: null,
        phone: null,
        cpf: null,
      },
    };
  },
  methods: {
    checkUnsaved,
    ...mapActions(useLoaderStore, ["startLoading", "stopLoading"]),
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
    validateFields() {
      let validation = [];
      validation.push(this.$refs.name.validation());
      validation.push(this.$refs.email.validation());
      validation.push(this.$refs.phone.validation());
      validation.push(this.$refs.cpf.validation());
      return validation.filter((element) => element == false).length == 0;
    },
    submit() {
      if (!this.validateFields()) return;

      this.startLoading();

      customerService
        .save(this.customer)
        .then((response) => {
          message.success(response.data.message).then(() => {
            this.updateUnsavedFlag(false);
            this.$router.push({ name: "customers-list" });
          });
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
        })
        .finally(() => {
          this.stopLoading();
        });
    },
    loadCustomerData() {
      customerService
        .getById(this.$route.query.id)
        .then((response) => {
          this.customer = response.data;
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
        });
    },
  },
  watch: {
    customer: {
      handler() {
        this.updateUnsavedFlag(true);
      },
      deep: true,
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.title = "Atualizar cliente";
      this.loadCustomerData();
    }
  },
  beforeRouteLeave(to, from, next) {
    checkUnsaved(next, this.unsavedFlag);
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 4.9rem 0 auto 0;
}

.save-button--customer {
  margin: 2.6rem 0 10.2rem 0;
}
</style>
