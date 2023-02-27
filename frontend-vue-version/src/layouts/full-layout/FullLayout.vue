<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppMenu from "@/layouts/components/Menu.vue";

export default {
  name: "FullLayout",
  components: {
    AppMenu,
  },
};
</script>
