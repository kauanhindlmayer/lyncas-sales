<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de vendas</h1>
        <div class="header__search">
          <label class="sr-only" for="search-button">Buscar vendas...</label>
          <input
            type="text"
            name="search-button"
            id="search-button"
            class="header__search-button"
            placeholder="Buscar vendas..."
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
          <template
            v-for="{
              customer,
              quantityItems,
              saleDate,
              billingDate,
              totalValue,
              id,
            } in sales"
            :key="id"
          >
            <tr>
              <td class="table--left-corner">{{ customer }}</td>
              <td>{{ quantityItems }}</td>
              <td>{{ formatString(saleDate) }}</td>
              <td>{{ formatString(billingDate) }}</td>
              <td>{{ formatNumber(totalValue) }}</td>
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
import { sale } from "../services/sale.service";
import { formatString, formatNumber } from "../helpers";

export default {
  name: "SaleTable",
  data() {
    return {
      sales: {},
    };
  },
  methods: {
    formatString,
    formatNumber,
    updateTable() {
      sale
        .get()
        .then((response) => {
          this.sales = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(id) {
      const answer = confirm("Deseja realmente deletar a venda?");

      if (answer) {
        sale
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
