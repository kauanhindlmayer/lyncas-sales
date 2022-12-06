<template>
  <div class="header__search">
    <label class="sr-only" for="search-button">{{ props.title }}</label>
    <input
      type="text"
      name="search-button"
      id="search-button"
      class="header__search-button"
      :placeholder="props.title"
    />
  </div>
</template>

<script setup>
const props = defineProps(["title"]);
</script>

<style>
.component__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.component__header h1 {
  margin-left: 0;
  font-size: 2.4rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.header__search-button {
  background: url(../images/search-icon.svg) no-repeat scroll 7px 7px;
  background-position: center;
  background-position-x: calc(100% - 12px);
  background-color: var(--background-secondary);
  color: var(--text-secondary);

  font-size: 1.6rem;

  border: 1px solid var(--border);
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.9rem 1.8rem;

  width: 38.8rem;
  height: 4.1rem;
}
</style>
