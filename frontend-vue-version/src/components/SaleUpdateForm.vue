<template>
  <div class="content">
    <section class="component">
      <h1 id="title">Atualizar venda</h1>
      <form class="form">
        <div class="form__form-wrapper">
          <div>
            <label for="customer-input">Cliente</label>
            <select
              class="select field"
              name="customer-input"
              id="customer-input"
              required
              v-model="sale.customerId"
            >
              <option data-default disabled selected></option>
              <option
                v-for="user in state.users"
                :value="user.id"
                :key="user.id"
              >
                {{ user.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="billing-date-input">Data de faturamento</label>
            <input
              type="date"
              name="billing-date-input"
              id="billing-date-input"
              class="input-date field"
              required
              maxlength="12"
              v-model="sale.billingDate"
            />
          </div>
        </div>
        <div class="form__dashed"></div>
        <h2>Itens do pedido</h2>
        <div class="form__form-wrapper">
          <div>
            <label for="description-input">Descrição do item</label>
            <input
              type="text"
              name="description-input"
              id="description-input"
              class="input field"
              placeholder=" "
              required
              maxlength="254"
              v-model="sale.items[0].itemDescription"
            />
          </div>
          <div>
            <label for="value-input">Valor unitário</label>
            <input
              type="number"
              name="value-input"
              id="value-input"
              class="input field"
              placeholder=" "
              required
              maxlength="16"
              v-model="sale.items[0].unitaryValue"
            />
          </div>
        </div>
        <div class="form__form-wrapper">
          <div>
            <label for="quantity-input">Quantidade</label>
            <input
              type="number"
              name="quantity-input"
              id="quantity-input"
              class="input field"
              placeholder=" "
              required
              maxlength="16"
              v-model="sale.items[0].quantity"
            />
          </div>
          <div>
            <label for="total-value-input">Valor total</label>
            <input
              type="number"
              name="total-value-input"
              id="total-value-input"
              class="input field"
              placeholder=" "
              required
              maxlength="16"
              v-model="sale.items[0].totalValue"
            />
          </div>
        </div>
        <div class="align-right">
          <button class="add-items-button">+ Mais itens</button>
        </div>
        <div class="dashed"></div>
        <div class="footer">
          <div class="footer__total-value">
            <span v-if="sale.items[0].totalValue === null">R$ 0,00</span>
            <span v-else>{{ toLocaleString(sale.items[0].totalValue) }}</span>
          </div>
          <div class="align-right">
            <button
              class="save-button save-button--sale"
              @click.prevent="UpdateSale()"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { api } from "../services/api.js";
import { reactive, onMounted } from "vue";
import { toLocaleString } from "../includes";
import router from "../router";
import { useRoute } from "vue-router";

const route = useRoute();

const sale = reactive({
  id: route.query.id,
  customerId: null,
  billingDate: null,
  items: [
    {
      itemDescription: null,
      unitaryValue: null,
      quantity: null,
      totalValue: null,
    },
  ],
});

const state = reactive({
  users: null,
});

async function UpdateSale() {
  const response = await api.put("Sale", sale);

  router.push("/lista-de-vendas");

  alert(response.data.message);
}

async function fillForm() {
  const response = await api.getById("Sale", route.query.id);

  sale.customerId = response.data.customerId;
  sale.billingDate = response.data.billingDate.slice(0, 10);
  sale.items[0].itemDescription = response.data.items[0].itemDescription;
  sale.items[0].unitaryValue = response.data.items[0].unitaryValue;
  sale.items[0].quantity = response.data.items[0].quantity;
  sale.items[0].totalValue = response.data.items[0].totalValue;
}

onMounted(async () => {
  const response = await api.get("Customer");
  state.users = response.data;

  fillForm();
});
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

  margin: 1.8rem 0 2rem 0;

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
</style>
