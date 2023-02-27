<template>
  <div class="login-container">
    <div class="main">
      <form class="form">
        <h1>{{ $t("GENERAL.CREATE_ACCOUNT") }}</h1>
        <input-text
          ref="name"
          label="Nome"
          :placeholder="$t('GENERAL.NAME')"
          v-model="user.name"
          hideLabel
          required
        />
        <input-text
          ref="email"
          label="E-mail"
          :placeholder="$t('GENERAL.EMAIL')"
          v-model="user.login"
          email
          hideLabel
          required
        />
        <input-text
          ref="password"
          type="password"
          label="Senha"
          :placeholder="$t('GENERAL.PASSWORD')"
          v-model="user.password"
          minlength="8"
          hideLabel
          required
        />
        <input-text
          ref="confirm_password"
          type="password"
          label="Confirmar Senha"
          :placeholder="$t('GENERAL.CONFIRM_PASSWORD')"
          v-model="user.passwordConfirmation"
          minlength="8"
          hideLabel
          required
        />
        <div class="text-danger">
          {{ error_message }}
        </div>
        <button type="submit" @click.prevent="register">
          {{ $t("GENERAL.CREATE") }}
        </button>
        <div class="login-container__footer">
          {{ $t("GENERAL.ALREADY_HAVE_AN_ACCOUNT") }}
          <RouterLink :to="{ name: 'login' }">
            {{ $t("GENERAL.SIGN_IN") }}
          </RouterLink>
        </div>
      </form>
    </div>
    <div class="aside">
      <div>
        <img src="@/assets/svg/logo.svg" alt="Lyncas logo" />
        <p v-html="$t('GENERAL.DESCRIPTION')"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useLoaderStore from "@/stores/loader";
import userService from "@/common/services/user.service";
import InputText from "../../components/inputs/InputText.vue";
import message from "@/common/utils/message.js";

export default {
  name: "RegisterForm",
  components: {
    InputText,
  },
  data() {
    return {
      user: {
        name: null,
        login: null,
        password: null,
        passwordConfirmation: null,
      },
      error_message: null,
    };
  },
  methods: {
    ...mapActions(useLoaderStore, ["startLoading", "stopLoading"]),
    validateFields() {
      let validation = [];
      validation.push(this.$refs.name.validation());
      validation.push(this.$refs.email.validation());
      validation.push(this.$refs.password.validation());
      validation.push(this.$refs.confirm_password.validation());
      return validation.filter((element) => element == false).length == 0;
    },
    register() {
      if (!this.validateFields()) return;

      if (this.user.password != this.user.passwordConfirmation) {
        this.error_message = "Senhas não conferem";
        return;
      } else {
        this.error_message = null;
      }

      this.startLoading();

      userService
        .register(this.user)
        .then((response) => {
          message.success(response.data.message).then(() => {
            this.$router.push({ name: "login" });
          });
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
        })
        .finally(() => {
          this.stopLoading();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  .aside {
    background-color: $primary-color;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 24.4rem;
      height: 5.6rem;
      margin-bottom: 6.6rem;
      margin-left: 9.3rem;
    }
  }
  p {
    color: $gray-100;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 3.4rem;
    text-align: center;
  }
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      color: $text-primary;
      font-weight: 500;
      font-size: 4rem;
      line-height: 5.8rem;
      text-align: center;
      margin-bottom: 5.2rem;
    }
    :deep(input) {
      color: $text-secondary;
      width: 34.5rem;
      height: 3.8rem;
      outline: none;
      padding: 0.4rem 1.8rem;
      background: $background-secondary;
      border: 1px solid $border;
      border-radius: 0.4rem;
      font-size: 1.6rem;
      margin-top: 1.1rem;
    }
    :deep(input) {
      &::placeholder {
        color: $text-secondary;
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.3rem;
      }
      &:last-child {
        margin-bottom: 2.4rem;
      }
    }
    button {
      margin-top: 1.1rem;
      width: 34.4rem;
      height: 3.9rem;
      background-color: $secondary-color;
      color: $background-secondary;
      font-weight: 700;
      font-size: 2rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      gap: 1rem;
      &:hover {
        filter: brightness(0.9);
      }
    }
  }
}
.login-container :deep(input),
.login-container button {
  display: block;
}
.login-container__footer {
  color: $text-secondary;
  font-size: 1.8rem;
  text-align: center;
  margin-top: 1rem;
  a {
    color: $primary-color;
  }
}

@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    .aside {
      img {
        margin: 3.3rem 8.5rem;
      }
    }
    .form {
      h1 {
        margin-top: 3.8rem;
      }
    }
    .main {
      button {
        margin-bottom: 20rem;
      }
    }
  }
}
</style>
