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

<style lang="scss">
.profile__button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 15rem;
  height: 5rem;
  background-color: $gray-100;
  font-size: 2rem;
  font-weight: 700;
  color: $background-secondary;
}
.profile__button--add {
  background-color: $secondary-color;
}
.profile__button--back:hover,
.profile__button--add:hover {
  filter: brightness(0.9);
}
</style>
