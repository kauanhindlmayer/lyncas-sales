<template>
  <div class="content__heading">
    <h1>{{ $t("GENERAL.PAGE_NOT_FOUND") }}</h1>
    <p>{{ $t("GENERAL.PAGE_NOT_FOUND_DESCRIPTION") }}</p>
  </div>
</template>

<style lang="scss" scoped>
.content__heading {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h2 {
    font-size: 1.5em;
    font-weight: 500;
  }
}
</style>
