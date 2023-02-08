<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de clientes</h1>
        <div class="header__search">
          <select class="header__select" v-model="selectedFilter" ref="select">
            <option value="Filter" disabled selected hidden>Filtros</option>
            <option value="Name">Nome</option>
            <option value="Email">E-mail</option>
            <option value="Phone">Telefone</option>
            <option value="Cpf">CPF</option>
          </select>
          <label class="sr-only" for="search-button">Buscar clientes...</label>
          <input
            type="text"
            name="search-button"
            id="search-button"
            class="header__search-button"
            placeholder="Buscar clientes..."
            v-model="searchInput"
            @keydown.enter="searchSales"
          />
        </div>
      </div>
      <div>
        <DataTable
          :value="customers"
          :paginator="true"
          :rows="5"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[7, 10, 20, 50, 100]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column field="name" header="Name"></Column>
          <Column field="email" header="E-mail"></Column>
          <Column field="phone" header="Telefone"></Column>
          <Column field="cpf" header="CPF"></Column>
        </DataTable>
      </div>
    </section>
  </div>
</template>

<script>
import customerService from "@/common/services/customer.service";

export default {
  name: "CustomerTable",
  data() {
    return {
      customers: null,
      searchInput: null,
      selectedFilter: "Filter",
    };
  },
  methods: {
    updateTable(resource) {
      customerService
        .get(resource)
        .then((response) => {
          this.customers = response.data.customers;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(id) {
      const answer = confirm("Deseja realmente deletar o cliente?");

      if (answer) {
        customerService
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
      this.$router.push({ name: "update-customer", query: { id: id } });
    },
    searchSales() {
      if (this.selectedFilter === "Filter") {
        this.$refs.select.focus();
        return;
      }

      this.updateTable(`?${this.selectedFilter}=${this.searchInput}`);
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

.header__search {
  display: flex;
}

.header__search-button {
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid var(--border);
  border-radius: 0 5px 5px 0;
  width: 38.8rem;
  height: 4.1rem;
  padding: 0.9rem 1.8rem;

  background: url(@/assets/svg/search-icon.svg) no-repeat scroll 7px 7px;
  background-position: center;
  background-position-x: calc(100% - 12px);
  background-color: var(--background-secondary);

  font-size: 1.6rem;
  color: var(--text-secondary);
}

.header__select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border: 1px solid var(--border);
  border-radius: 5px 0 0 5px;
  height: 4.1rem;
  width: 19.8rem;
  padding: 0 1.8rem;

  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 10L12 14L16 10' stroke='%239C98A6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: right 1.5rem top 50%;

  font-size: 1.6rem;
  color: var(--text-secondary);
}
</style>
