<template>
  <button @click="handleDelete" class="table__button table__button--delete">
    Deletar
  </button>
</template>

<script setup>
import { api } from "../services/api";
const props = defineProps(["id", "resource"]);
const emit = defineEmits(["updateTable"]);

async function handleDelete() {
  const answer = confirm(
    `Deseja realmente deletar ${
      props.resource === "Customer" ? "o cliente" : "a venda"
    }?`
  );

  if (answer) {
    const response = await api.delete(props.resource, props.id);

    emit("updateTable");

    alert(response.data.message);
  }
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
