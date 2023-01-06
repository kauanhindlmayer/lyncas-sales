<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de clientes</h1>
        <div class="header__search">
          <label class="sr-only" for="search-button">Buscar clientes...</label>
          <input
            type="text"
            name="search-button"
            id="search-button"
            class="header__search-button"
            placeholder="Buscar clientes..."
          />
        </div>
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
                <button
                  @click="handleDelete(customer.id)"
                  class="table__button table__button--delete"
                >
                  Deletar
                </button>
                <button
                  @click="handleEdit(customer.id)"
                  class="table__button table__button--edit"
                >
                  Editar
                </button>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { api } from "../services/api.js";
import { reactive, onMounted } from "vue";

async function updateTable() {
  const response = await api.get("Customer");
  state.customers = response.data;
}

async function handleDelete(id) {
  const answer = confirm("Deseja realmente deletar o cliente?");

  if (answer) {
    const response = await api.delete("Customer", id);

    updateTable();

    alert(response.data.message);
  }
}

const state = reactive({
  customers: null,
});

onMounted(() => {
  updateTable();
});
</script>

<style>
.table__button {
  margin-right: 0.8rem;
  cursor: pointer;
}

.table__button--edit {
  background-color: var(--background-quaternary);
  color: var(--text-quaternary);
  border: 1px solid var(--border-light-blue);
}

.table__button--delete {
  background-color: var(--background-tertiary);
  color: var(--text-tertiary);
  border: 1px solid var(--border-light-red);
}

.table__button:hover {
  filter: brightness(0.9);
}

.component__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.component__header h1 {
  margin-left: 0;
  font-size: 2.4rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.header__search-button {
  background: url(../assets/svg/search-icon.svg) no-repeat scroll 7px 7px;
  background-position: center;
  background-position-x: calc(100% - 12px);
  background-color: var(--background-secondary);
  color: var(--text-secondary);

  font-size: 1.6rem;

  border: 1px solid var(--border);
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.9rem 1.8rem;

  width: 38.8rem;
  height: 4.1rem;
}
</style>
