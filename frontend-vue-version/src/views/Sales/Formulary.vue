<template>
  <app-header>
    <header-button :title="$t('GENERAL.BACK')" routeName="sales-list" />
  </app-header>
  <div class="content">
    <section class="component">
      <div class="component__add-sales">
        <h1>{{ title }}</h1>
        <form class="form">
          <div class="form__form-wrapper">
            <input-select
              ref="customer"
              :label="$t('SALE.CUSTOMER')"
              optionLabel="name"
              optionValue="id"
              v-model="sale.customerId"
              :value="sale.customerId"
              :options="users"
              required
            />
            <input-date
              ref="billingDate"
              :label="$t('SALE.BILLING_DATE')"
              v-model="sale.billingDate"
              :value="sale.billingDate"
              required
            />
            <!-- <input-text
              ref="billingDate"
              type="date"
              :label="$t('SALE.BILLING_DATE')"
              v-model="sale.billingDate"
              :value="sale.billingDate"
              required
            /> -->
          </div>
          <div class="form__dashed"></div>
          <h2>Itens do pedido</h2>
          <template v-for="(item, index) in sale.items" :key="item.id">
            <div class="form__item">
              <div class="form__dashed" v-if="index > 0"></div>
              <div class="form__form-wrapper">
                <input-text
                  ref="itemDescription"
                  :label="$t('SALE.ITEM_DESCRIPTION')"
                  v-model="sale.items[index].itemDescription"
                  :value="sale.items[index].itemDescription"
                  placeholder=" "
                  minLength="3"
                  maxlength="254"
                  required
                />
                <input-text
                  ref="unitaryValue"
                  :label="$t('SALE.UNITARY_VALUE')"
                  v-model="sale.items[index].unitaryValue"
                  :value="sale.items[index].unitaryValue"
                  type="number"
                  placeholder=" "
                  maxlength="10"
                  required
                />
              </div>
              <div class="form__form-wrapper">
                <input-text
                  ref="quantity"
                  :label="$t('SALE.QUANTITY')"
                  v-model="sale.items[index].quantity"
                  :value="sale.items[index].quantity"
                  type="number"
                  placeholder=" "
                  max="100"
                  required
                />
                <input-text
                  ref="totalValue"
                  :label="$t('SALE.TOTAL_VALUE')"
                  v-model="sale.items[index].totalValue"
                  :value="sale.items[index].totalValue"
                  type="number"
                  placeholder=" "
                  maxlength="10"
                  required
                />
              </div>
              <button
                v-if="index > 0"
                class="form__button--remove-sales"
                @click.prevent="removeItem(index)"
              >
                Deletar
              </button>
            </div>
          </template>

          <div class="align-right">
            <button class="add-items-button" @click.prevent="addItem">
              {{ $t("SALE.PLUS_ITEMS") }}
            </button>
          </div>
          <div class="form__dashed"></div>
          <div class="footer">
            <div class="footer__total-value">
              <span>{{ totalValue() }}</span>
            </div>
            <div class="align-right">
              <button
                class="save-button save-button--sale"
                type="submit"
                @click.prevent="createSale"
              >
                {{ $t("GENERAL.SAVE") }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { InputText, InputSelect, InputDate } from "@/components/inputs";
import useLoaderStore from "@/stores/loader";
import AppHeader from "@/layouts/components/Header.vue";
import HeaderButton from "@/layouts/components/HeaderButton.vue";
import checkUnsaved from "@/common/middlewares/checkUnsaved.js";
import saleService from "@/common/services/sale.service";
import customerService from "@/common/services/customer.service";
import message from "@/common/utils/message.js";
import helper from "@/common/utils/helper.js";

export default {
  name: "SaleCreate",
  components: {
    AppHeader,
    HeaderButton,
    InputText,
    InputSelect,
    InputDate,
  },
  data() {
    return {
      title: this.$t("SALE.ADD_SALE"),
      unsavedFlag: false,
      quantityItems: 1,
      sale: {
        id: this.$route.params.id,
        customerId: null,
        billingDate: null,
        items: [
          {
            id: this.quantityItems,
            itemDescription: null,
            unitaryValue: null,
            quantity: null,
            totalValue: null,
          },
        ],
      },
      users: [],
    };
  },
  methods: {
    formatCurrency: helper.formatCurrency,
    checkUnsaved,
    ...mapActions(useLoaderStore, ["startLoading", "stopLoading"]),
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
    totalValue() {
      let total = 0;

      for (let item of this.sale.items) {
        item.totalValue =
          item.unitaryValue && item.quantity
            ? item.unitaryValue * item.quantity
            : null;
        total += item.totalValue;
      }

      return `Total: ${this.formatCurrency(total)}`;
    },
    addItem() {
      this.quantityItems += 1;
      this.sale.items.push({
        id: this.quantityItems,
        itemDescription: null,
        unitaryValue: null,
        quantity: null,
        totalValue: null,
      });
    },
    removeItem(index) {
      this.sale.items.splice(index, 1);
    },
    validateFields() {
      let validation = [];
      validation.push(this.$refs.customer.validation());
      validation.push(this.$refs.billingDate.validation());
      for (let i = 0; i < this.sale.items.length; i++) {
        validation.push(this.$refs.itemDescription[i].validation());
        validation.push(this.$refs.unitaryValue[i].validation());
        validation.push(this.$refs.quantity[i].validation());
        validation.push(this.$refs.totalValue[i].validation());
      }
      return validation.filter((element) => element == false).length == 0;
    },
    createSale() {
      if (!this.validateFields()) return;

      this.startLoading();

      saleService
        .save(this.sale)
        .then((response) => {
          message.success(response.data.message).then(() => {
            this.updateUnsavedFlag(false);
            this.$router.push({ name: "sales-list" });
          });
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
        })
        .finally(() => {
          this.stopLoading();
        });
    },
    loadCustomerData() {
      customerService
        .list()
        .then((response) => {
          this.users = response.data.customers;
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
        });
    },
    loadSaleData() {
      saleService
        .getById(this.$route.query.id)
        .then((response) => {
          this.sale = response.data;
          this.sale.billingDate = response.data.billingDate.slice(0, 10);
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
        });
    },
  },
  watch: {
    sale: {
      handler() {
        this.updateUnsavedFlag(true);
      },
      deep: true,
    },
  },
  beforeRouteLeave(to, from, next) {
    checkUnsaved(next, this.unsavedFlag);
  },
  beforeMount() {
    this.loadCustomerData();

    if (this.$route.query.id) {
      this.title = this.$t("SALE.UPDATE_SALE");
      this.loadSaleData();
    }
  },
};
</script>

<style lang="scss" scoped>
.component__add-sales {
  overflow-y: auto;
  height: calc(100vh - 15rem);
}
.content {
  margin: 2.3rem 0 auto 0;
}
.form__dashed {
  margin-top: 1.8rem;
  border-bottom: 1px dashed $border;
  margin-top: 1.8rem;
  border-bottom: 1px dashed $border;
}
.form__button--remove-sales {
  margin-top: 0.9rem;
  border: 1px solid $border-light-red;
  border-radius: 5px;
  width: 7.5rem;
  height: 3.5rem;
  background-color: $background-tertiary;
  cursor: pointer;
  color: $text-tertiary;
}
.add-items-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.8rem 0 0 0;
  border: 1px solid $text-primary;
  border-radius: 4px;
  width: calc(50% - 9px);
  height: 3.9rem;
  background-color: $background-secondary;
  cursor: pointer;
  font-weight: 700;
  font-size: 2rem;
  color: $text-primary;
  &:hover {
    filter: brightness(0.9);
  }
}
.footer {
  display: flex;
  align-items: center;
  margin: 2.6rem 0 1.6rem 0;
  width: 100%;
}
.footer__total-value {
  font-size: 2.4rem;
  line-height: 3.5rem;
  font-weight: 700;
  color: $text-primary;
}

@media only screen and (max-width: 1366px) {
  .footer {
    margin: 2.6rem 0 1.3rem 0;
  }
}
</style>
