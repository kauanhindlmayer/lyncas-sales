<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de clientes</h1>
        <SearchInput title="Buscar clientes..." />
      </div>
      <div class="component__table-wrapper">
        <table class="component__table">
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
          <template v-for="customer in state.customers" :key="customer.id">
            <tr>
              <td class="table--left-corner">{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td>{{ customer.cpf }}</td>
              <td class="table--right-corner">
                <DeleteButton :id="customer.id" />
                <EditButton :id="customer.id" />
              </td>
            </tr>
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import SearchInput from "./SearchInput.vue";
import DeleteButton from "./DeleteButton.vue";
import EditButton from "./EditButton.vue";
import { api } from "../services/api.js";
import { reactive, onMounted } from "vue";

const state = reactive({
  customers: null,
});

onMounted(async () => {
  const response = await api.get("Customer");
  state.customers = response.data;
});
</script>
