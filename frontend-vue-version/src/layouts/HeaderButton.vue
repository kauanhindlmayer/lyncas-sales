<template>
  <div
    :class="[
      'profile__button',
      { 'profile__button--add': title === 'Adicionar' },
    ]"
  >
    <router-link :to="{ name: routeName }">{{ title }}</router-link>
  </div>
</template>

<script>
export default {
  name: "HeaderButton",
  props: ["title", "routeName"],
};
</script>

<style>
.profile__button {
  background-color: var(--gray-100);
  color: var(--background-secondary);

  border-radius: 4px;
  width: 15rem;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  font-weight: 700;
}

.profile__button--add {
  background-color: var(--secondary-color);
}

.profile__button--back:hover,
.profile__button--add:hover {
  filter: brightness(0.9);
}
</style>
