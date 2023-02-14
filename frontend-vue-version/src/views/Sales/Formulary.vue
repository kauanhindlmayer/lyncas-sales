<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header>
        <header-button title="Voltar" routeName="sales-list" />
      </app-header>
      <div class="content">
        <section class="component">
          <div class="component__add-sales">
            <h1>{{ title }}</h1>
            <form class="form">
              <div class="form__form-wrapper">
                <input-select
                  ref="customer"
                  label="Cliente"
                  v-model="sale.customerId"
                  :value="sale.customerId"
                  :options="users"
                  required
                />
                <input-text
                  ref="billingDate"
                  type="date"
                  label="Data do Faturamento"
                  v-model="sale.billingDate"
                  :value="sale.billingDate"
                  required
                />
              </div>
              <div class="form__dashed"></div>
              <h2>Itens do pedido</h2>
              <template v-for="(item, index) in sale.items" :key="item.id">
                <div class="form__item">
                  <div class="form__dashed" v-if="index > 0"></div>
                  <div class="form__form-wrapper">
                    <input-text
                      ref="itemDescription"
                      label="Descrição do item"
                      v-model="sale.items[index].itemDescription"
                      :value="sale.items[index].itemDescription"
                      placeholder=" "
                      minLength="3"
                      maxlength="254"
                      required
                    />
                    <input-text
                      ref="unitaryValue"
                      label="Valor unitário"
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
                      label="Quantidade"
                      v-model="sale.items[index].quantity"
                      :value="sale.items[index].quantity"
                      type="number"
                      placeholder=" "
                      max="100"
                      required
                    />
                    <input-text
                      ref="totalValue"
                      label="Valor total"
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
                  + Mais itens
                </button>
              </div>
              <div class="form__dashed"></div>
              <div class="footer">
                <div class="footer__total-value">
                  <span>{{ totalValue }}</span>
                </div>
                <div class="align-right">
                  <button
                    class="save-button save-button--sale"
                    type="submit"
                    @click.prevent="createSale"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
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
import checkUnsaved from "@/common/middlewares/checkUnsaved.js";
import saleService from "@/common/services/sale.service";
import customerService from "@/common/services/customer.service";
import { InputText, InputSelect } from "@/components/inputs";
import message from "@/common/utils/message.js";

export default {
  name: "SaleCreate",
  components: {
    AppMenu,
    AppHeader,
    HeaderButton,
    InputText,
    InputSelect,
  },
  data() {
    return {
      title: "Adicionar venda",
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
      users: null,
      totalValue: "",
    };
  },
  methods: {
    checkUnsaved,
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
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
  mounted() {
    this.loadCustomerData();

    if (this.$route.query.id) {
      this.title = "Atualizar venda";
      this.loadSaleData();
    }
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

.form__dashed {
  margin-top: 1.8rem;
  border-bottom: 1px dashed var(--border);
}

.form__button--remove-sales {
  margin-top: 0.9rem;
  border: 1px solid var(--border-light-red);
  border-radius: 5px;
  width: 7.5rem;
  height: 3.5rem;

  background-color: var(--background-tertiary);
  cursor: pointer;

  color: var(--text-tertiary);
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
