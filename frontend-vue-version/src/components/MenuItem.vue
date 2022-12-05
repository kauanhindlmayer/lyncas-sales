<template>
  <div class="menu__item menu__item--dashboard">
    <img
      class="menu__item__icon"
      :src="state.dynamicSource"
      :alt="state.dynamicAlt"
    />
    <RouterLink :to="props.path">{{ props.name }}</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { reactive } from "vue";

const state = reactive({
  dynamicSource: `./src/assets/${props.name.toLowerCase()}-icon.svg`,
  dynamicAlt: `${props.name} icon`,
});
const props = defineProps(["name", "path"]);
</script>

<style scoped>
.menu__item {
  color: var(--background-secondary);

  width: 12.6rem;
  margin-bottom: 1.4rem;

  border: 1px solid var(--border-blue);
  border-radius: 4px;

  display: flex;
  align-items: center;
}

.menu__item span a {
  color: var(--background-secondary);
  text-decoration: none;
}

.menu__item:hover {
  background-color: var(--border-blue);
  filter: brightness(0.9);
}

.menu__item__icon {
  width: 1.6rem;
  height: 1.6rem;
  margin: 0.9rem 1.2rem;
}

.menu__item--dashboard {
  top: 26.6rem;
}

.menu__item--customers {
  top: 31.5rem;
}

.menu__item--sales {
  top: 36.4rem;
}
</style>
