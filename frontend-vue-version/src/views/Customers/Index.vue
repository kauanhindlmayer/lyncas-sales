<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Adicionar" routeName="create-customer" />
      </app-header>
      <div class="content">
        <section class="component component--background">
          <div class="component__header">
            <h1 class="header__title">Lista de clientes</h1>
            <div class="header__search">
              <select
                class="header__select"
                v-model="selectedFilter"
                ref="select"
              >
                <option value="Filter" disabled selected hidden>Filtros</option>
                <option value="Name">Nome</option>
                <option value="Email">E-mail</option>
                <option value="Phone">Telefone</option>
                <option value="Cpf">CPF</option>
              </select>
              <label class="sr-only" for="search-button">
                Buscar clientes...
              </label>
              <input
                type="text"
                name="search-button"
                id="search-button"
                class="header__search-button"
                placeholder="Buscar clientes..."
                v-model="searchInput"
                @keydown.enter="search"
              />
            </div>
          </div>
          <div class="component__table-wrapper">
            <DataTable :value="customers" responsiveLayout="scroll">
              <template #empty> Nenhum registro encontrado </template>
              <Column field="name" header="Name" :sortable="true"></Column>
              <Column field="email" header="E-mail" :sortable="true"></Column>
              <Column field="phone" header="Telefone" :sortable="true"></Column>
              <Column field="cpf" header="CPF" :sortable="true"></Column>
              <Column>
                <template #header>Ações</template>
                <template #body="slotProps">
                  <button
                    @click="handleDelete(slotProps.data.id)"
                    class="table__button table__button--delete"
                  >
                    Deletar
                  </button>
                  <button
                    @click="handleEdit(slotProps.data.id)"
                    class="table__button table__button--edit"
                  >
                    Editar
                  </button>
                </template>
              </Column>
            </DataTable>
            <Paginator
              :template="{
                default:
                  'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              }"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
              :rows="limit"
              :totalRecords="totalRecords"
              @page="onPage($event)"
            >
            </Paginator>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from "@/layouts/Menu.vue";
import AppHeader from "@/layouts/Header.vue";
import HeaderButton from "@/layouts/HeaderButton.vue";
import customerService from "@/common/services/customer.service";
import message from "@/common/utils/message.js";

export default {
  name: "Index",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
  },
  data() {
    return {
      limit: 4,
      offset: 0,
      totalRecords: null,
      customers: null,
      searchInput: null,
      selectedFilter: "Filter",
    };
  },
  methods: {
    onPage(event) {
      customerService
        .paginate(this.limit, event.page * this.limit)
        .then((response) => {
          this.customers = response.data.customers;
        });
    },
    updateTable() {
      customerService.paginate(this.limit, this.offset).then((response) => {
        this.customers = response.data.customers;
      });
    },
    async handleDelete(id) {
      const answer = await message.confirm(
        "Deseja realmente deletar o cliente?"
      );

      if (answer.isConfirmed) {
        customerService
          .delete(id)
          .then((response) => {
            this.updateTable();
            message.success(response.data.message);
          })
          .catch((error) => {
            message.error(error.response.data.notifications[0].message);
          });
      }
    },
    handleEdit(id) {
      this.$router.push({ name: "update-customer", query: { id: id } });
    },
    search() {
      if (this.selectedFilter === "Filter") {
        this.$refs.select.focus();
        return;
      }

      this.updateTable(`?${this.selectedFilter}=${this.searchInput}`);
    },
    configurePaginator() {
      customerService.get().then((response) => {
        this.totalRecords = response.data.recordsQuantity;
        this.limit = 4;
      });
    },
  },
  mounted() {
    this.configurePaginator();
    this.updateTable();
  },
};
</script>

<style>
.p-paginator {
  display: flex;
  justify-content: flex-end;
}

.p-paginator-current {
  position: absolute;
  left: 18.2rem;
}

.content {
  margin: 2.3rem 0 auto 0;
}

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