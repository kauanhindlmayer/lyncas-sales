<template>
  <div class="content">
    <section class="component">
      <h1 id="title">Atualizar cliente</h1>
      <vee-form
        class="form"
        :validation-schema="schema"
        :initial-values="userData"
        @submit="updateCustomer"
      >
        <div class="form__form-wrapper">
          <div>
            <!-- Nome -->
            <label for="name-input">Nome</label>
            <vee-field
              name="nome"
              type="text"
              id="name-input"
              class="input field"
              placeholder=" "
              required
            />
            <ErrorMessage class="text-error" name="nome" />
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
              name="telefone"
              type="tel"
              id="phone-input"
              class="input field phone"
              placeholder=" "
              required
            />
            <ErrorMessage class="text-error" name="telefone" />
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
import { api } from "../services/api.service.js";
import { reactive, onMounted } from "vue";
import router from "../router";
import { useRoute } from "vue-router";
import { user } from "../services/user.service";

const route = useRoute();

const schema = reactive({
  nome: "required|min:3|max:100|alpha_spaces",
  email: "required|min:3|max:100|email",
  telefone: "required|min:9|max:16",
  cpf: "required|min:11|max:14",
});

const userData = reactive({
  nome: null,
  email: null,
  telefone: null,
  cpf: null,
});

async function updateCustomer(values) {
  const response = await api.put("Customer/atualizar", {
    id: route.query.id,
    name: values.nome,
    email: values.email,
    phone: values.telefone,
    cpf: values.cpf,
  });

  router.push("/lista-de-clientes");

  alert(response.data.message);
}

async function getUserData() {
  const response = await user.getById(route.query.id);

  userData.nome = response.data.name;
  userData.email = response.data.email;
  userData.telefone = response.data.phone;
  userData.cpf = response.data.cpf;
}

onMounted(() => {
  getUserData();
});
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
