<template>
  <div :class="dynamicClass">
    <img class="menu__item__icon" :src="dynamicSource" :alt="dynamicAlt" />
    <RouterLink :to="path">{{ name }}</RouterLink>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: ["name", "path", "modifier"],
  data() {
    return {
      dynamicClass: `menu__item menu__item--${this.modifier}`,
      dynamicSource: `/src/assets/svg/${this.name.toLowerCase()}-icon.svg`,
      dynamicAlt: `${this.name} icon`,
    };
  },
};
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

  position: absolute;
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
  left: 1.75rem;
  top: calc(50% - 4.9rem);
}

.menu__item--customers {
  left: 1.75rem;
  top: 50%;
}

.menu__item--sales {
  left: 1.75rem;
  top: calc(50% + 4.9rem);
}
</style>
