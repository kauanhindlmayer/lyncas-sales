<template>
  <div :class="buttonClass">
    <RouterLink :to="buttonPath">{{ title }}</RouterLink>
  </div>
</template>

<script>
export default {
  name: "HeaderButton",
  props: ["title", "path"],
  data() {
    return {
      buttonClass: `profile__button profile__button--${
        this.title == "Adicionar" ? "add" : "back"
      }`,
      buttonPath: { name: `${this.path}` },
    };
  },
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
