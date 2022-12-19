<template>
  <div class="content">
    <section class="component component--background">
      <div class="component__header">
        <h1 class="header__title">Lista de vendas</h1>
        <SearchInput title="Buscar vendas..." />
      </div>
      <div class="component__table-wrapper">
        <table class="component__table">
          <tr>
            <th>Cliente</th>
            <th>Qtd. itens</th>
            <th>Data da venda</th>
            <th>Data faturamento</th>
            <th>Valor total</th>
            <th>Ações</th>
          </tr>
          <template v-for="x in 6" :key="x">
            <tr>
              <td class="table--left-corner">Genara Sousa</td>
              <td>1</td>
              <td>14/05/2022</td>
              <td>14/05/2022</td>
              <td>R$ 90,00</td>
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
