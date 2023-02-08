<template>
  <div class="content">
    <section class="component">
      <h1>Adicionar cliente</h1>
      <form class="form">
        <div class="form__form-wrapper">
          <input-text v-model="values.name" ref="name" label="Nome" required />
          <input-text
            v-model="values.email"
            ref="email"
            label="E-mail"
            required
          />
        </div>
        <div class="form__form-wrapper">
          <input-text
            v-model="values.phone"
            ref="phone"
            label="Telefone"
            required
          />
          <input-text v-model="values.cpf" ref="cpf" label="CPF" required />
        </div>
        <div class="align-right">
          <button
            class="save-button save-button--customer"
            type="submit"
            @click.prevent="createCustomer"
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
      values: {
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
    createCustomer() {
      if (!this.validateFields())
        return alert("Por favor valide o formulário.");

      customerService
        .create({
          name: this.values.name,
          email: this.values.email,
          phone: this.values.phone,
          cpf: this.values.cpf,
        })
        .then((response) => {
          this.updateUnsavedFlag(false);
          this.$router.push({ name: "customers-list" });
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.notifications[0].message);
        });
    },
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
