<template>
  <div class="main-wrapper">
    <router-view />
    <loader />
  </div>
</template>

<script>
import Loader from "@/components/loader/loader.vue";

export default {
  name: "App",
  components: {
    Loader,
  },
};
</script>
