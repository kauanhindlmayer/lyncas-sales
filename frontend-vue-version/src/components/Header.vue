<template>
  <div class="header">
    <div class="profile">
      <div class="profile__picture">
        <img
          src="../assets/images/profile-picture-placeholder.png"
          alt="User profile picture"
        />
      </div>

      <div class="profile__name">
        <h3>Olá, {{ name }}</h3>
        <a @click="handleLogout">Sair</a>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import jwtService from "../common/services/jwt.service";
import { mapStores, mapState } from "pinia";
import useUserStore from "../stores/user";

export default {
  name: "AppHeader",
  methods: {
    handleLogout() {
      const answer = confirm("Deseja realmente sair?");

      if (answer) {
        jwtService.removeToken();
        jwtService.removeUsername();

        useUserStore().$reset();

        this.$router.push({ name: "login" });
      }
    },
  },
  computed: {
    ...mapStores(useUserStore),
    ...mapState(useUserStore, ["name"]),
  },
};
</script>

<style scoped>
.profile__picture img {
  width: 4.8rem;
  height: 4.6rem;
  object-fit: contain;
}

.header {
  border-bottom: 2px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile__picture {
  width: 5rem;
  height: 5rem;
  border: 2px solid var(--border);
  border-radius: 5px;
}

.profile {
  display: flex;
}

.profile__name {
  color: var(--text-primary);
  font-weight: 700;
  margin-left: 1.8rem;
}

.profile__name a {
  cursor: pointer;
  color: var(--gray-100);
  font-weight: 500;
  text-decoration: none;
}

.profile__name a:hover {
  filter: brightness(0.9);
}

.profile__button {
  background-color: var(--gray-100);
  color: var(--background-secondary);

  border-radius: 4px;
  width: 15rem;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  font-weight: 700;
}

.profile__button--add {
  background-color: var(--secondary-color);
}

.profile__button--back:hover,
.profile__button--add:hover {
  filter: brightness(0.9);
}

.profile__exit {
  display: none;
}
</style>
