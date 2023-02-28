<template>
  <app-header>
    <header-button :title="$t('GENERAL.ADD')" routeName="create-sale" />
  </app-header>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">{{ $t("SALE.SALE_LIST") }}</h1>
        <div class="header__search">
          <select class="header__select" v-model="selectedFilter" ref="select">
            <option value="Filter" disabled selected hidden>
              {{ $t("SALE.FILTERS") }}
            </option>
            <!-- <option value="Customer">{{ $t("SALE.CUSTOMER") }}</option> -->
            <option value="QuantityItems">
              {{ $t("SALE.QUANTITY_ITEMS") }}
            </option>
            <option value="SaleDate">{{ $t("SALE.SALE_DATE") }}</option>
            <option value="BillingDate">{{ $t("SALE.BILLING_DATE") }}</option>
            <option value="TotalValue">{{ $t("SALE.TOTAL_VALUE") }}</option>
          </select>
          <label class="sr-only" for="search-button">
            {{ $t("SALE.SEARCH") }}
          </label>
          <input
            type="text"
            name="search-button"
            id="search-button"
            class="header__search-button"
            :placeholder="$t('SALE.SEARCH')"
            v-model="searchParam"
            @keydown.enter="searchSales"
          />
        </div>
      </div>
      <div class="component__table-wrapper">
        <DataTable :value="sales" responsiveLayout="scroll">
          <template #empty> Nenhum registro encontrado </template>
          <Column
            field="customer"
            :header="$t('SALE.CUSTOMER')"
            :sortable="true"
          />
          <Column
            field="quantityItems"
            :header="$t('SALE.QUANTITY_ITEMS')"
            :sortable="true"
          />

          <Column :sortable="true">
            <template #header>{{ $t("SALE.SALE_DATE") }}</template>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.saleDate) }}
            </template>
          </Column>

          <Column :sortable="true">
            <template #header>{{ $t("SALE.BILLING_DATE") }}</template>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.billingDate) }}
            </template>
          </Column>

          <Column :sortable="true">
            <template #header>{{ $t("SALE.TOTAL_VALUE") }}</template>
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.totalValue) }}
            </template>
          </Column>
          <Column>
            <template #header>{{ $t("SALE.ACTIONS") }}</template>
            <template #body="slotProps">
              <button
                @click="handleDelete(slotProps.data.id)"
                class="table__button table__button--delete"
              >
                {{ $t("GENERAL.DELETE") }}
              </button>
              <button
                @click="handleEdit(slotProps.data.id)"
                class="table__button table__button--edit"
              >
                {{ $t("GENERAL.EDIT") }}
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
      <Paginator
        template="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
        :rows="limit"
        :totalRecords="totalRecords"
        :rowsPerPageOptions="[limit, 10, 20, 30, 50]"
        @page="onPage($event)"
      >
      </Paginator>
    </section>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useLoaderStore from "@/stores/loader";
import AppHeader from "@/layouts/components/Header.vue";
import HeaderButton from "@/layouts/components/HeaderButton.vue";
import saleService from "@/common/services/sale.service";
import message from "@/common/utils/message.js";
import helper from "@/common/utils/helper.js";

export default {
  name: "Index",
  components: {
    AppHeader,
    HeaderButton,
  },
  data() {
    return {
      sales: null,
      totalRecords: null,
      searchParam: null,
      selectedFilter: "Filter",
    };
  },
  computed: {
    limit() {
      return document.documentElement.clientWidth > 1366 ? 8 : 4;
    },
  },
  methods: {
    formatDate: helper.formatDate,
    formatCurrency: helper.formatCurrency,
    ...mapActions(useLoaderStore, ["startLoading", "stopLoading"]),
    onPage(event) {
      this.startLoading();

      saleService
        .listPaginated(
          event ? event.rows : this.limit,
          event ? event.rows * event.page : 0
        )
        .then((response) => {
          this.sales = response.data.sales;
        })
        .finally(() => {
          this.stopLoading();
        });
    },
    async handleDelete(id) {
      const answer = await message.confirm(this.$t("SALE.CONFIRM_DELETE"));

      if (answer.isConfirmed) {
        this.startLoading();

        saleService
          .delete(id)
          .then((response) => {
            message.success(response.data.message).then(() => {
              this.onPage();
            });
          })
          .catch((error) => {
            message.error(error.response.data.notifications[0].message);
          })
          .finally(() => {
            this.stopLoading();
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

      if (this.searchParam.length < 1) {
        this.onPage();
        return;
      }

      saleService
        .search(this.selectedFilter, this.searchParam)
        .then((response) => {
          this.sales = response.data.sales;
        });
    },
    configurePaginator() {
      saleService.list().then((response) => {
        this.totalRecords = response.data.recordsQuantity;
      });
    },
  },
  async mounted() {
    this.configurePaginator();
    this.onPage();
  },
};
</script>

<style lang="scss">
.content {
  margin: 2.3rem 0 auto 0;
}
.component__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin-left: 0;
    font-size: 2.4rem;
  }
}
.sr-only {
  position: absolute;
  margin: -1px;
  width: 1px;
  height: 1px;
  padding: 0;
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
  border: 1px solid $border;
  border-radius: 0 5px 5px 0;
  width: 38.8rem;
  height: 4.1rem;
  padding: 0.9rem 1.8rem;
  background: url(@/assets/svg/search-icon.svg) no-repeat scroll 7px 7px;
  background-position: center;
  background-position-x: calc(100% - 12px);
  background-color: $background-secondary;
  font-size: 1.6rem;
  color: $text-secondary;
}
.header__select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid $border;
  border-radius: 5px 0 0 5px;
  height: 4.1rem;
  width: 19.8rem;
  padding: 0 1.8rem;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 10L12 14L16 10' stroke='%239C98A6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: right 1.5rem top 50%;
  font-size: 1.6rem;
  color: $text-secondary;
}
</style>
