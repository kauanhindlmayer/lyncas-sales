<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Menu />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import Menu from "../common/components/Menu.vue";
</script>
