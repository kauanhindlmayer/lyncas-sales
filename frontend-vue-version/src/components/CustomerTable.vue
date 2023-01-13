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
          <template
            v-for="{ name, email, phone, cpf, id } in customers"
            :key="id"
          >
            <tr>
              <td class="table--left-corner">{{ name }}</td>
              <td>{{ email }}</td>
              <td>{{ phone }}</td>
              <td>{{ cpf }}</td>
              <td class="table--right-corner">
                <button
                  @click="handleDelete(id)"
                  class="table__button table__button--delete"
                >
                  Deletar
                </button>
                <button
                  @click="handleEdit(id)"
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

<script>
import { customer } from "../services/customer.service";
import router from "../router";

export default {
  name: "CustomerTable",
  data() {
    return {
      customers: {},
    };
  },
  methods: {
    updateTable() {
      customer
        .get()
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(id) {
      const answer = confirm("Deseja realmente deletar o cliente?");

      if (answer) {
        customer
          .delete(id)
          .then((response) => {
            this.updateTable();
            alert(response.data.message);
          })
          .catch((error) => {
            alert(error.response.data.notifications[0].message);
          });
      }
    },
    handleEdit(id) {
      router.push(`/atualizar-cliente?id=${id}`);
    },
  },
  async mounted() {
    this.updateTable();
  },
};
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
