<template>
  <button class="table__button table__button--edit">Editar</button>
</template>

<style>
.table__button {
  margin-right: 0.8rem;
  cursor: pointer;
}
.table__button--edit {
  background-color: var(--background-quaternary);
  color: var(--text-quaternary);
  border: 1px solid var(--border-light-blue);
}

.table__button:hover {
  filter: brightness(0.9);
}
</style>
