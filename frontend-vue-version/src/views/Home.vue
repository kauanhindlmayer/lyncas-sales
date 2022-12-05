<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Menu />
  <div class="main">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
// import Header from "../components/Header.vue";
// import Content from "../components/Content.vue";
import Menu from "../components/Menu.vue";
</script>
