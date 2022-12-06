<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de clientes</h1>
        <SearchInput title="Buscar clientes..." />
      </div>
      <div class="component__table">
        <table>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
          <tr>
            <td class="table--left-corner">Genara Sousa</td>
            <td>genara7sousa@gmail.com</td>
            <td>(91) 99844-3343</td>
            <td>000.000.000-00</td>
            <td class="table--right-corner">
              <button class="table__button table__button--delete">
                Deletar
              </button>
              <button class="table__button table__button--edit">Editar</button>
            </td>
          </tr>
          <tr>
            <td class="table--left-corner">Genara Sousa</td>
            <td>genara7sousa@gmail.com</td>
            <td>(91) 99844-3343</td>
            <td>000.000.000-00</td>
            <td class="table--right-corner">
              <button class="table__button table__button--delete">
                Deletar
              </button>
              <button class="table__button table__button--edit">Editar</button>
            </td>
          </tr>
          <tr>
            <td class="table--left-corner">Genara Sousa</td>
            <td>genara7sousa@gmail.com</td>
            <td>(91) 99844-3343</td>
            <td>000.000.000-00</td>
            <td class="table--right-corner">
              <button class="table__button table__button--delete">
                Deletar
              </button>
              <button class="table__button table__button--edit">Editar</button>
            </td>
          </tr>
          <tr>
            <td class="table--left-corner">Genara Sousa</td>
            <td>genara7sousa@gmail.com</td>
            <td>(91) 99844-3343</td>
            <td>000.000.000-00</td>
            <td class="table--right-corner">
              <button class="table__button table__button--delete">
                Deletar
              </button>
              <button class="table__button table__button--edit">Editar</button>
            </td>
          </tr>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import SearchInput from "./SearchInput.vue";
</script>

<style>
/* Common Styles */
.component {
  background: var(--background-secondary);
  border: 1px solid var(--border);
  border-radius: 5px;
  width: 100%;
  height: 100%;
}

.component h1 {
  color: var(--text-primary);
  margin: 3.4rem 4.1rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.9rem;
}

.component h2 {
  color: var(--text-primary);
  margin: 1.8rem 0;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.6rem;
}

.form {
  margin: 0 3.1rem 0 3.1rem;
}

.form__form-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.8rem;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.component label {
  color: var(--text-secondary);
  display: block;
  margin-top: 1.8rem;
}

.component form div {
  width: 100%;
}

.component .input,
.component .input-date,
.component .select {
  color: var(--text-secondary);

  border: 1px solid var(--border);
  border-radius: 4px;
  outline: none;

  width: 100%;
  height: 3.8rem;

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.3rem;

  padding: 0 1.5rem;
}

.input:focus,
.input-date:focus,
.select:focus {
  box-shadow: inset 0 -3px 0 0px var(--secondary-color);
  transition: box-shadow 0.25s ease-out;
}

.input:not(:focus):not(:placeholder-shown):invalid,
.error-input {
  box-shadow: inset 0 -3px 0 0px var(--quaternary-color);
  transition: box-shadow 0.25s ease-out;
}

.component .select {
  appearance: none;
  -webkit-appearance: none;

  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 10L12 14L16 10' stroke='%239C98A6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: right 1.5rem top 50%;
}

.component .save-button {
  background: var(--secondary-color);
  color: var(--background-secondary);

  font-weight: 700;
  font-size: 2rem;

  border-radius: 4px;
  border: none;

  width: calc(50% - 9px);
  height: 3.9rem;

  cursor: pointer;
}

.component .save-button:hover {
  filter: brightness(0.9);
}

.component .save-button--sale {
  width: calc(100% - 9px);
}

/* Sales and Clients Components Styles */
.component--background {
  background-color: var(--background);
  border: none;
}

/* .component__table {
  width: 100%;
  overflow: auto;
} */

.component table {
  border-collapse: separate;
  border-spacing: 0 1.8rem;
  width: 100%;
}

.component table tr th {
  color: var(--text-secondary);

  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.3rem;
  text-align: left;

  margin-bottom: 1.8rem;
}

.component table tr td {
  min-width: 20rem;
}

.component table td {
  background-color: var(--background-secondary);
  color: var(--text-primary);
  font-weight: 500;
  padding: 2.4rem 1.2rem;
}

.component .table--left-corner {
  border-radius: 5px 0 0 5px;
}

.component .table--right-corner {
  border-radius: 0 5px 5px 0;
}

.component .spacing {
  margin-bottom: 1.8rem;
}

.component table td button {
  border-radius: 5px;
  width: 7.5rem;
  height: 3.5rem;
}

.table__button {
  margin-right: 0.8rem;
  cursor: pointer;
}

.table__button--delete {
  background-color: var(--background-tertiary);
  color: var(--text-tertiary);
  border: 1px solid var(--border-light-red);
}

.table__button--edit {
  background-color: var(--background-quaternary);
  color: var(--text-quaternary);
  border: 1px solid var(--border-light-blue);
}

.table__button:hover {
  filter: brightness(0.9);
}

/* Clients Component Styles */
.save-button--client {
  margin-top: 2.6rem;
  margin-bottom: 10.2rem;
}

/* Sales Component Styles */
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
