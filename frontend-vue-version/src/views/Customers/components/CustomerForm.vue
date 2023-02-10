<template>
  <div class="content">
    <section class="component">
      <h1>{{ title }}</h1>
      <form class="form">
        <div class="form__form-wrapper">
          <input-text
            v-model="customer.name"
            ref="name"
            label="Nome"
            :value="customer.name"
            required
          />
          <input-text
            v-model="customer.email"
            ref="email"
            label="E-mail"
            :value="customer.email"
            email
            required
          />
        </div>
        <div class="form__form-wrapper">
          <input-text
            v-model="customer.phone"
            ref="phone"
            label="Telefone"
            :value="customer.phone"
            required
            minlength="8"
          />
          <input-text
            v-model="customer.cpf"
            ref="cpf"
            label="CPF"
            :value="customer.cpf"
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
import customerService from "@/common/services/customer.service";
import message from "@/common/utils/message.js";
import { InputText } from "@/components/inputs";

export default {
  name: "CustomerForm",
  components: {
    InputText,
  },
  props: {
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
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

      customerService
        .save(this.customer)
        .then((response) => {
          this.updateUnsavedFlag(false);
          this.$router.push({ name: "customers-list" });
          message.success(response.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
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
    "customer.name"(newValue) {
      this.updateUnsavedFlag(newValue);
    },
    "customer.email"(newValue) {
      this.updateUnsavedFlag(newValue);
    },
    "customer.phone"(newValue) {
      this.updateUnsavedFlag(newValue);
    },
    "customer.cpf"(newValue) {
      this.updateUnsavedFlag(newValue);
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.title = "Atualizar cliente";
      this.loadCustomerData();
    }
  },
};
</script>

<style scoped>
.content {
  margin: 4.9rem 0 auto 0;
}

.save-button--customer {
  margin: 2.6rem 0 10.2rem 0;
}
</style>
