<template>
  <app-header>
    <header-button :title="$t('GENERAL.ADD')" routeName="create-customer" />
  </app-header>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">{{ $t("CUSTOMER.CUSTOMER_LIST") }}</h1>
        <div class="header__search">
          <select class="header__select" v-model="selectedFilter" ref="select">
            <option value="Filter" disabled selected hidden>
              {{ $t("CUSTOMER.FILTERS") }}
            </option>
            <option value="Name">{{ $t("GENERAL.NAME") }}</option>
            <option value="Email">{{ $t("GENERAL.EMAIL") }}</option>
            <option value="Phone">{{ $t("CUSTOMER.PHONE") }}</option>
            <option value="Cpf">{{ $t("CUSTOMER.CPF") }}</option>
          </select>
          <label class="sr-only" for="search-button">
            {{ $t("CUSTOMER.SEARCH") }}
          </label>
          <input
            type="text"
            name="search-button"
            id="search-button"
            class="header__search-button"
            :placeholder="$t('CUSTOMER.SEARCH')"
            v-model="searchParam"
            @keydown.enter="search"
          />
        </div>
      </div>
      <div class="component__table-wrapper">
        <DataTable :value="customers" responsiveLayout="scroll">
          <template #empty> Nenhum registro encontrado </template>
          <Column field="name" :header="$t('GENERAL.NAME')" :sortable="true" />
          <Column
            field="email"
            :header="$t('GENERAL.EMAIL')"
            :sortable="true"
          />
          <Column
            field="phone"
            :header="$t('CUSTOMER.PHONE')"
            :sortable="true"
          />
          <Column field="cpf" :header="$t('CUSTOMER.CPF')" :sortable="true" />
          <Column>
            <template #header>{{ $t("CUSTOMER.ACTIONS") }}</template>
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
        :currentPageReportTemplate="
          $t('GENERAL.CURRENT_PAGE_REPORT', {
            first: '{first}',
            last: `{last}`,
            totalRecords: '{totalRecords}',
          })
        "
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
import customerService from "@/common/services/customer.service";
import message from "@/common/utils/message.js";

export default {
  name: "Index",
  components: {
    AppHeader,
    HeaderButton,
  },
  data() {
    return {
      customers: null,
      totalRecords: null,
      current_page: 1,
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
    ...mapActions(useLoaderStore, ["startLoading", "stopLoading"]),
    onPage(event) {
      this.startLoading();

      customerService
        .listPaginated(
          event ? event.rows : this.limit,
          event ? event.rows * event.page : 0
        )
        .then((response) => {
          this.customers = response.data.customers;
        })
        .finally(() => {
          this.stopLoading();
        });
    },
    async handleDelete(id) {
      const answer = await message.confirm(this.$t("CUSTOMER.CONFIRM_DELETE"));

      if (answer.isConfirmed) {
        this.startLoading();

        customerService
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
      this.$router.push({ name: "update-customer", query: { id: id } });
    },
    search() {
      if (this.selectedFilter === "Filter") {
        this.$refs.select.focus();
        return;
      }

      if (this.searchParam.length < 1) {
        this.onPage();
        return;
      }

      customerService
        .search(this.selectedFilter, this.searchParam)
        .then((response) => {
          this.customers = response.data.customers;
        });
    },
    configurePaginator() {
      customerService.list().then((response) => {
        this.totalRecords = response.data.recordsQuantity;
      });
    },
  },
  mounted() {
    this.configurePaginator();
    this.onPage();
  },
};
</script>

<style lang="scss">
.content {
  margin: 2.3rem 0 auto 0;
}
.table__button {
  margin-right: 0.8rem;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
}
.table__button--edit {
  border: 1px solid $border-light-blue;
  background-color: $background-quaternary;
  color: $text-quaternary;
}
.table__button--delete {
  border: 1px solid $border-light-red;
  background-color: $background-tertiary;
  color: $text-tertiary;
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
