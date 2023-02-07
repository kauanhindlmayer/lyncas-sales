<template>
  <div class="content">
    <section class="component">
      <div class="component__add-sales">
        <h1>Adicionar venda</h1>
        <vee-form class="form" :validation-schema="schema" @submit="createSale">
          <div class="form__form-wrapper">
            <div>
              <label for="customer-input">Cliente</label>
              <!-- Select Customer -->
              <vee-field
                as="select"
                name="customer"
                class="select field"
                id="customer-input"
                required
                label="cliente"
                @input="updateUnsavedFlag(true)"
              >
                <option data-default disabled selected></option>
                <option v-for="{ name, id } in users" :value="id" :key="id">
                  {{ name }}
                </option>
              </vee-field>
              <ErrorMessage class="error-message" name="customer" />
            </div>
            <div>
              <!-- Billing Date -->
              <label for="billing-date-input">Data de faturamento</label>
              <vee-field
                name="billingDate"
                type="date"
                id="billing-date-input"
                class="input-date field"
                required
                label="data de faturamento"
                @input="updateUnsavedFlag(true)"
              />
              <ErrorMessage class="error-message" name="billingDate" />
            </div>
          </div>
          <div class="form__dashed"></div>
          <h2>Itens do pedido</h2>
          <sale-item
            v-for="(item, index) in items"
            :key="item.id"
            :index="index"
          />
          <div class="align-right">
            <button class="add-items-button" @click.prevent="addItem">
              + Mais itens
            </button>
          </div>
          <div class="form__dashed"></div>
          <div class="footer">
            <div class="footer__total-value">
              <span>{{ formatNumber(totalValue) }}</span>
            </div>
            <div class="align-right">
              <button class="save-button save-button--sale" type="submit">
                Salvar
              </button>
            </div>
          </div>
        </vee-form>
      </div>
    </section>
  </div>
</template>

<script>
import saleService from "../../../common/services/sale.service";
import customerService from "../../../common/services/customer.service";
import { formatNumber } from "../../../common/utils/helper";
import SaleItem from "./SaleItem.vue";

export default {
  name: "SaleForm",
  props: {
    updateUnsavedFlag: {
      type: Function,
    },
  },
  components: {
    SaleItem,
  },
  data() {
    return {
      schema: {
        customer: "required",
        billingDate: "required",
        "itemDescription-0": "required|min:3|max:100|",
        "unitaryValue-0": "required|min_value:1|max_value:100000",
        "quantity-0": "required|min_value:1|max_value:100",
        "totalValue-0": "required|min_value:1|max_value:100000",
      },
      users: {},
      totalValue: "",
      items: [{ id: 0, value: null }],
      id: 1,
    };
  },
  methods: {
    formatNumber,
    addItem() {
      this.items.push({
        id: this.id,
        value: null,
      });
      this.buildValidations();
      this.id++;
    },
    buildValidations() {
      this.schema[`itemDescription-${this.id}`] =
        this.schema["itemDescription-0"];
      this.schema[`unitaryValue-${this.id}`] = this.schema["unitaryValue-0"];
      this.schema[`quantity-${this.id}`] = this.schema["quantity-0"];
      this.schema[`totalValue-${this.id}`] = this.schema["totalValue-0"];
    },
    getItems(values) {
      const items = [];

      for (let i = 0; i < this.id; i++) {
        items.push({
          itemDescription: values[`itemDescription-${i}`],
          unitaryValue: values[`unitaryValue-${i}`],
          quantity: values[`quantity-${i}`],
          totalValue: values[`totalValue-${i}`],
        });
      }

      return items;
    },
    createSale(values) {
      saleService
        .create({
          customerId: values.customer,
          billingDate: values.billingDate,
          items: this.getItems(values),
        })
        .then((response) => {
          this.updateUnsavedFlag(false);
          this.$router.push({ name: "sales-list" });
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.notifications[0].message);
        });
    },
    loadCustomerData() {
      customerService
        .get()
        .then((response) => {
          this.users = response.data.customers;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.loadCustomerData();
  },
};
</script>

<style scoped>
.component__add-sales {
  overflow-y: auto;

  height: calc(100vh - 15rem);
}

.content {
  margin: 2.3rem 0 auto 0;
}

.add-items-button {
  background-color: var(--background-secondary);
  color: var(--text-primary);
  border: 1px solid var(--text-primary);
  border-radius: 4px;
  font-weight: 700;
  font-size: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(50% - 9px);
  height: 3.9rem;

  margin: 1.8rem 0 0 0;

  cursor: pointer;
}

.add-items-button:hover {
  filter: brightness(0.9);
}

.form__dashed {
  margin-top: 1.8rem;
  border-bottom: 1px dashed var(--border);
}

.footer {
  display: flex;
  align-items: center;
  margin: 2.6rem 0 1.6rem 0;
  width: 100%;
}

.footer__total-value {
  color: var(--text-primary);
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 3.5rem;
}

@media only screen and (max-width: 1366px) {
  .footer {
    margin: 2.6rem 0 1.3rem 0;
  }
}
</style>
