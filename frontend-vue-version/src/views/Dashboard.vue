<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <Header />
    <div class="content">
      <div class="content__heading">
        <h2>Bem-vindo a Lyncas</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
</script>

<style scoped>
.content {
  margin: 4.9rem 0 auto 0;
}

.content__heading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content__heading h2 {
  font-weight: 500;
}
</style>
