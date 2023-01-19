<template>
  <div class="content">
    <section class="component">
      <h1>Atualizar venda</h1>
      <vee-form
        class="form"
        :validation-schema="schema"
        @submit="updateSale"
        :initial-values="saleData"
      >
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
        <div class="form__form-wrapper">
          <div>
            <!-- Item Description -->
            <label for="description-input">Descrição do item</label>
            <vee-field
              name="itemDescription"
              type="text"
              id="description-input"
              class="input field"
              placeholder=" "
              required
              label="descrição do item"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage class="error-message" name="itemDescription" />
          </div>
          <div>
            <!-- Unitary Value -->
            <label for="value-input">Valor unitário</label>
            <vee-field
              name="unitaryValue"
              type="number"
              step="any"
              id="value-input"
              class="input field"
              placeholder=" "
              required
              label="valor unitário"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage class="error-message" name="unitaryValue" />
          </div>
        </div>
        <div class="form__form-wrapper">
          <div>
            <!-- Quantity -->
            <label for="quantity-input">Quantidade</label>
            <vee-field
              name="quantity"
              type="number"
              id="quantity-input"
              class="input field"
              placeholder=" "
              required
              label="quantidade"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage class="error-message" name="quantity" />
          </div>
          <div>
            <!-- Total Value -->
            <label for="total-value-input">Valor total</label>
            <vee-field
              name="totalValue"
              type="number"
              step="any"
              id="total-value-input"
              class="input field"
              placeholder=" "
              required
              label="valor total"
              v-model="totalValue"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage class="error-message" name="totalValue" />
          </div>
        </div>
        <div class="align-right">
          <button class="add-items-button">+ Mais itens</button>
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
    </section>
  </div>
</template>

<script>
import { sale } from "../services/sale.service";
import { customer } from "../services/customer.service";
import { formatNumber } from "../helpers";

export default {
  name: "SalaForm",
  props: {
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      schema: {
        customer: "required",
        billingDate: "required",
        itemDescription: "required|min:3|max:100|",
        unitaryValue: "required|min_value:1|max_value:100000",
        quantity: "required|min_value:1|max_value:100",
        totalValue: "required|min_value:1|max_value:100000",
      },
      totalValue: "",
      saleData: {},
      users: {},
    };
  },
  methods: {
    formatNumber,
    updateSale(values) {
      sale
        .update({
          id: this.$route.query.id,
          customerId: values.customer,
          billingDate: values.billingDate,
          items: [
            {
              itemDescription: values.itemDescription,
              unitaryValue: values.unitaryValue,
              quantity: values.quantity,
              totalValue: values.totalValue,
            },
          ],
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
      customer
        .get()
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadSaleData() {
      sale
        .getById(this.$route.query.id)
        .then((response) => {
          this.saleData.customer = response.data.customerId;
          this.saleData.billingDate = response.data.billingDate.slice(0, 10);
          this.saleData.itemDescription =
            response.data.items[0].itemDescription;
          this.saleData.unitaryValue = response.data.items[0].unitaryValue;
          this.saleData.quantity = response.data.items[0].quantity;
          this.saleData.totalValue = response.data.items[0].totalValue;
        })
        .catch((error) => {
          alert(error.response.data.notifications[0].message);
        });
    },
  },
  mounted() {
    this.loadCustomerData();
    this.loadSaleData();
  },
};
</script>

<style scoped>
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
