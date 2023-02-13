<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Adicionar" routeName="create-sale" />
      </app-header>
      <div class="content">
        <section class="component component--background">
          <div class="component__header">
            <h1 class="header__title">Lista de vendas</h1>
            <div class="header__search">
              <select
                class="header__select"
                v-model="selectedFilter"
                ref="select"
              >
                <option value="Filter" disabled selected hidden>Filtros</option>
                <option value="Customer">Cliente</option>
                <option value="QuantityItems">Quantidade</option>
                <option value="SaleDate">Data da Venda</option>
                <option value="BillingDate">Data do Faturamento</option>
                <option value="TotalValue">Valor Total</option>
              </select>
              <label class="sr-only" for="search-button">
                Buscar vendas...
              </label>
              <input
                type="text"
                name="search-button"
                id="search-button"
                class="header__search-button"
                placeholder="Buscar vendas..."
                v-model="searchInput"
                @keydown.enter="searchSales"
              />
            </div>
          </div>
          <div>
            <DataTable
              :value="sales"
              :paginator="true"
              :rows="4"
              paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[4, 10, 20, 50, 100]"
              responsiveLayout="scroll"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
            >
              <Column field="customer" header="Cliente" :sortable="true" />
              <Column
                field="quantityItems"
                header="Qtd. Itens"
                :sortable="true"
              />
              <Column
                field="saleDate"
                header="Data da Venda"
                :sortable="true"
              />
              <Column
                field="billingDate"
                header="Data do Faturamento"
                :sortable="true"
              />
              <Column
                field="totalValue"
                header="Valor Total"
                :sortable="true"
              />
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
import saleService from "@/common/services/sale.service";
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
      sales: null,
      searchInput: null,
      selectedFilter: "Filter",
    };
  },
  methods: {
    updateTable(resource) {
      saleService
        .get(resource)
        .then((response) => {
          this.sales = response.data.sales;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async handleDelete(id) {
      const answer = await message.confirm("Deseja realmente deletar a venda?");

      if (answer.isConfirmed) {
        saleService
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
      this.$router.push({ name: "update-sale", query: { id: id } });
    },
    searchSales() {
      if (this.selectedFilter === "Filter") {
        this.$refs.select.focus();
        return;
      }

      console.log(`?${this.selectedFilter}=${this.searchInput}`);

      this.updateTable(`?${this.selectedFilter}=${this.searchInput}`);
    },
  },
  async mounted() {
    this.updateTable();
  },
};
</script>

<style scoped>
.content {
  margin: 2.3rem 0 auto 0;
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
