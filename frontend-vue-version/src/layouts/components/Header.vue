<template>
  <div class="header">
    <div class="profile">
      <div class="profile__picture">
        <img
          src="@/assets/images/profile-picture-placeholder.png"
          alt="User profile picture"
        />
      </div>

      <div class="profile__name">
        <h3>Olá, {{ username }}</h3>
        <a @click="handleLogout">Sair</a>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import jwtService from "@/common/services/jwt.service";
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
import message from "@/common/utils/message.js";

export default {
  name: "AppHeader",
  data() {
    return {
      username: jwtService.getUsername(),
    };
  },
  methods: {
    ...mapActions(useUserStore, ["removeAuthenticationData"]),
    async handleLogout() {
      const answer = await message.confirm("Deseja realmente sair?");

      if (answer.isConfirmed) {
        this.removeAuthenticationData();
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile__picture {
  border: 2px solid $border;
  border-radius: 5px;
  width: 5rem;
  height: 5rem;
  img {
    width: 4.8rem;
    height: 4.6rem;
    object-fit: contain;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid $border;
}
.profile {
  display: flex;
}
.profile__name {
  margin-left: 1.8rem;
  font-weight: 700;
  color: $text-primary;
  a {
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    color: $gray-100;
    &:hover {
      filter: brightness(0.9);
    }
  }
}
.profile__button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  width: 15rem;
  height: 5rem;
  background-color: $gray-100;
  font-size: 2rem;
  font-weight: 700;
  color: $background-secondary;
}
.profile__button--add {
  background-color: $secondary-color;
}
.profile__button--back:hover,
.profile__button--add:hover {
  filter: brightness(0.9);
}
.profile__exit {
  display: none;
}
</style>
