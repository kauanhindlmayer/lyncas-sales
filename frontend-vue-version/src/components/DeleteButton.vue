<template>
  <button @click="handleDelete" class="table__button table__button--delete">
    Deletar
  </button>
</template>

<script setup>
import router from "../router";
import { api } from "../services/api";
const props = defineProps(["id"]);

async function handleDelete() {
  const answer = confirm("Deseja realmente deletar o cliente?");

  if (answer) {
    console.log(props.id);
    const response = await api.delete("Customer", props.id);

    router.push("/lista-de-clientes");

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
