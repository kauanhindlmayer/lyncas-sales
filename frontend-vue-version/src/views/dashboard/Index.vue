<template>
  <app-header />
  <div class="content">
    <div class="content__heading">
      <h2>{{ $t("GENERAL.WELCOME") }}</h2>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/layouts/components/Header.vue";

export default {
  name: "TheDashboard",
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 4.9rem 0 auto 0;
}
.content__heading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h2 {
    font-weight: 500;
  }
}
</style>
