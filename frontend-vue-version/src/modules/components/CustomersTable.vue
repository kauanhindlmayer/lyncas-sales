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
          <template v-for="x in 6" :key="x">
            <CustomersTableRow
              name="Genara Sousa"
              email="genara7sousa@gmail.com"
              phone="(91) 99844-3343"
              cpf="000.000.000-00"
            />
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import CustomersTableRow from "./CustomersTableRow.vue";
import SearchInput from "./SearchInput.vue";
</script>

<style>
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
  margin-left: 0;
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

.component--background {
  background-color: var(--background);
  border: none;
}

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
</style>
