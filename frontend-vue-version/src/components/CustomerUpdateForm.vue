<template>
  <div class="content">
    <section class="component">
      <h1 id="title">Atualizar cliente</h1>
      <form class="form">
        <div class="form__form-wrapper">
          <div>
            <label for="name-input">Nome</label>
            <input
              type="text"
              name="name-input"
              id="name-input"
              class="input field"
              placeholder=" "
              required
              maxlength="254"
              v-model="state.name"
            />
          </div>
          <div>
            <label for="email-input">E-mail</label>
            <input
              type="email"
              name="email-input"
              id="email-input"
              class="input field email"
              placeholder=" "
              required
              maxlength="254"
              v-model="state.email"
            />
          </div>
        </div>
        <div class="form__form-wrapper">
          <div>
            <label for="phone-input">Telefone</label>
            <input
              type="tel"
              name="phone-input"
              id="phone-input"
              class="input field phone"
              placeholder=" "
              required
              maxlength="16"
              v-model="state.phone"
            />
          </div>
          <div>
            <label for="cpf-input">CPF</label>
            <input
              type="text"
              name="cpf-input"
              id="cpf-input"
              class="input field cpf"
              placeholder=" "
              required
              maxlength="14"
              v-model="state.cpf"
            />
          </div>
        </div>
        <div class="align-right">
          <button
            class="save-button save-button--customer"
            @click.prevent="updateCustomer"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { api } from "../services/api.js";
import { reactive, onMounted } from "vue";
import router from "../router";
import { useRoute } from "vue-router";

const route = useRoute();

const state = reactive({
  id: route.query.id,
  name: null,
  email: null,
  phone: null,
  cpf: null,
});

async function updateCustomer() {
  const response = await api.put("Customer", state);

  router.push("/lista-de-clientes");

  alert(response.data.message);
}

async function fillForm() {
  const response = await api.getById("Customer", route.query.id);

  state.name = response.data.name;
  state.email = response.data.email;
  state.phone = response.data.phone;
  state.cpf = response.data.cpf;
}

onMounted(() => {
  fillForm();
});
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
