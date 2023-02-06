<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de vendas</h1>
        <div class="header__search">
          <select class="header__select" v-model="selectedFilter" ref="select">
            <option value="Filter" disabled selected hidden>Filtros</option>
            <option value="Customer">Cliente</option>
            <option value="QuantityItems">Quantidade</option>
            <option value="SaleDate">Data da Venda</option>
            <option value="BillingDate">Data do Faturamento</option>
            <option value="TotalValue">Valor Total</option>
          </select>
          <label class="sr-only" for="search-button">Buscar vendas...</label>
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
      <div class="component__table-wrapper">
        <table class="component__table">
          <tr>
            <th>Cliente</th>
            <th>Qtd. itens</th>
            <th>Data da venda</th>
            <th>Data faturamento</th>
            <th>Valor total</th>
            <th>Ações</th>
          </tr>
          <template v-for="sale in sales" :key="sale.id">
            <tr>
              <td class="table--left-corner">{{ sale.customer }}</td>
              <td>{{ sale.quantityItems }}</td>
              <td>{{ formatString(sale.saleDate) }}</td>
              <td>{{ formatString(sale.billingDate) }}</td>
              <td>{{ formatNumber(sale.totalValue) }}</td>
              <td class="table--right-corner">
                <button
                  @click="handleDelete(sale.id)"
                  class="table__button table__button--delete"
                >
                  Deletar
                </button>
                <button
                  @click="handleEdit(sale.id)"
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
import saleService from "../services/sale.service";
import { formatString, formatNumber } from "../includes/helper";

export default {
  name: "SaleTable",
  data() {
    return {
      sales: {},
      searchInput: null,
      selectedFilter: "Filter",
    };
  },
  methods: {
    formatString,
    formatNumber,
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
    handleDelete(id) {
      const answer = confirm("Deseja realmente deletar a venda?");

      if (answer) {
        saleService
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

  background: url(../assets/svg/search-icon.svg) no-repeat scroll 7px 7px;
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
