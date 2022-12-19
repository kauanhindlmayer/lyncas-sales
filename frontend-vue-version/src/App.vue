<template>
  <Menu />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
</script>
