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
            <ErrorMessage class="text-error" name="name" />
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
            <ErrorMessage class="text-error" name="email" />
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
            <ErrorMessage class="text-error" name="phone" />
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
            <ErrorMessage class="text-error" name="cpf" />
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

<script setup>
import { api } from "../services/api.js";
import { reactive } from "vue";
import router from "../router";

const schema = reactive({
  name: "required|min:3|max:100|alpha_spaces",
  email: "required|min:3|max:100|email",
  phone: "required|min:9|max:16",
  cpf: "required|min:11|max:14",
});

async function createCustomer(values) {
  const response = await api.post("Customer", {
    name: values.nome,
    email: values.email,
    phone: values.telefone,
    cpf: values.cpf,
  });

  router.push("/lista-de-clientes");

  alert(response.data.message);
}
</script>

<style scoped>
.text-error {
  color: #e53e3e;
}

.content {
  margin: 2.3rem 0 auto 0;
}

.save-button--customer {
  margin-top: 2.6rem;
  margin-bottom: 10.2rem;
}
</style>
