<template>
  <div class="content">
    <section class="component">
      <h1 id="title">Adicionar venda</h1>
      <form class="form">
        <div class="form__form-wrapper">
          <div>
            <label for="customer-input">Cliente</label>
            <select
              class="select field"
              name="customer-input"
              id="customer-input"
              required
            >
              <option value="" data-default disabled selected></option>
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
            />
          </div>
        </div>
        <div class="align-right">
          <button class="add-items-button">+ Mais itens</button>
        </div>
        <div class="dashed"></div>
        <div class="footer">
          <div class="footer__total-value">R$ 24.550,00</div>
          <div class="align-right">
            <button
              class="save-button save-button--sale"
              onclick="handleSubmit()"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

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
