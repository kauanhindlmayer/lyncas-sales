<template>
  <div class="content">
    <section class="component">
      <h1>Adicionar cliente</h1>
      <vee-form
        class="form"
        :validation-schema="schema"
        @submit="createCustomer"
      >
        <div class="form__form-wrapper">
          <div>
            <!-- Nome -->
            <label for="name-input">Nome</label>
            <vee-field
              name="name"
              type="text"
              id="name-input"
              class="input field"
              placeholder=" "
              required
              label="nome"
            />
            <ErrorMessage class="error-message" name="name" />
          </div>
          <div>
            <!-- E-mail -->
            <label for="email-input">E-mail</label>
            <vee-field
              name="email"
              type="email"
              id="email-input"
              class="input field email"
              placeholder=" "
              required
            />
            <ErrorMessage class="error-message" name="email" />
          </div>
        </div>
        <div class="form__form-wrapper">
          <div>
            <!-- Telefone -->
            <label for="phone-input">Telefone</label>
            <vee-field
              name="phone"
              type="tel"
              id="phone-input"
              class="input field phone"
              placeholder=" "
              required
              label="telefone"
            />
            <ErrorMessage class="error-message" name="phone" />
          </div>
          <div>
            <!-- CPF -->
            <label for="cpf-input">CPF</label>
            <vee-field
              name="cpf"
              type="text"
              id="cpf-input"
              class="input field cpf"
              placeholder=" "
              required
            />
            <ErrorMessage class="error-message" name="cpf" />
          </div>
        </div>
        <div class="align-right">
          <button class="save-button save-button--customer" type="submit">
            Salvar
          </button>
        </div>
      </vee-form>
    </section>
  </div>
</template>

<script>
import { customer } from "../services/customer.service";
import router from "../router";

export default {
  name: "CustomerForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        phone: "required|min:9|max:16",
        cpf: "required|min:11|max:14",
      },
    };
  },
  methods: {
    createCustomer(values) {
      customer
        .create({
          name: values.name,
          email: values.email,
          phone: values.phone,
          cpf: values.cpf,
        })
        .then((response) => {
          router.push("/lista-de-clientes");
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
  margin: 2.3rem 0 auto 0;
}

.save-button--customer {
  margin-top: 2.6rem;
  margin-bottom: 10.2rem;
}
</style>
