<template>
  <button @click="handleDelete" class="table__button table__button--delete">
    Deletar
  </button>
</template>

<script setup>
function handleDelete() {
  confirm("Deseja realmente deletar o cliente?");
}
</script>

<style>
.table__button {
  margin-right: 0.8rem;
  cursor: pointer;
}
.table__button--delete {
  background-color: var(--background-tertiary);
  color: var(--text-tertiary);
  border: 1px solid var(--border-light-red);
}
.table__button:hover {
  filter: brightness(0.9);
}
</style>
