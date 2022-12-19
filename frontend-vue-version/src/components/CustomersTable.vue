<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de clientes</h1>
        <SearchInput title="Buscar clientes..." />
      </div>
      <div class="component__table-wrapper">
        <table class="component__table">
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
          <template v-for="x in 6" :key="x">
            <tr>
              <td class="table--left-corner">Genara Sousa</td>
              <td>genara7sousa@gmail.com</td>
              <td>(91) 99844-3343</td>
              <td>000.000.000-00</td>
              <td class="table--right-corner">
                <DeleteButton />
                <EditButton />
              </td>
            </tr>
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import SearchInput from "./SearchInput.vue";
import DeleteButton from "./DeleteButton.vue";
import EditButton from "./EditButton.vue";
</script>
