<template>
  <div class="container">
    <app-menu />
    <div class="main">
      <app-header />
      <div class="content">
        <div class="content__heading">
          <h2>Bem-vindo a Lyncas</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from "@/layouts/Menu.vue";
import AppHeader from "@/layouts/Header.vue";

export default {
  name: "TheDashboard",
  components: {
    AppMenu,
    AppHeader,
  },
};
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
