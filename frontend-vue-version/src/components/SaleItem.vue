<template>
  <div class="form__item">
    <div class="form__dashed" v-if="index > 0"></div>
    <div class="form__form-wrapper">
      <div>
        <label for="description">Descrição do item</label>
        <vee-field
          :name="`itemDescription-${index}`"
          label="descrição do item"
          type="text"
          id="description"
          class="input field"
          placeholder=" "
          required
          maxlength="254"
        />
        <ErrorMessage
          class="error-message"
          :name="`itemDescription-${index}`"
        />
      </div>
      <div>
        <label for="value">Valor unitário</label>
        <vee-field
          :name="`unitaryValue-${index}`"
          label="valor unitário"
          type="number"
          step="any"
          id="value"
          class="input field"
          placeholder=" "
          required
          maxlength="10"
        />
        <ErrorMessage class="error-message" :name="`unitaryValue-${index}`" />
      </div>
    </div>
    <div class="form__form-wrapper">
      <div>
        <label for="quantity">Quantidade</label>
        <vee-field
          :name="`quantity-${index}`"
          label="quantidade"
          type="number"
          id="quantity"
          class="input field"
          placeholder=" "
          required
          maxlength="5"
        />
        <ErrorMessage class="error-message" :name="`quantity-${index}`" />
      </div>
      <div>
        <label for="total-value">Valor total</label>
        <vee-field
          :name="`totalValue-${index}`"
          label="valor total"
          type="number"
          step="any"
          id="total-value"
          class="input field"
          placeholder=" "
          required
          maxlength="10"
        />
        <ErrorMessage class="error-message" :name="`totalValue-${index}`" />
      </div>
    </div>
    <button
      v-if="index > 0"
      class="form__button--remove-sales"
      @click.prevent="removeItem()"
    >
      Deletar
    </button>
  </div>
</template>

<script>
export default {
  name: "SaleItem",
  props: ["index"],
  methods: {
    removeItem() {
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style>
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
</style>
