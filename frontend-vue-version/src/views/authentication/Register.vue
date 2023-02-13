<template>
  <div class="login-container">
    <div class="main">
      <form class="form">
        <h1>Criar conta</h1>
        <input-text
          ref="name"
          label="Nome"
          placeholder="Nome"
          v-model="user.name"
          hideLabel
          required
        />
        <input-text
          ref="email"
          label="E-mail"
          placeholder="E-mail"
          v-model="user.email"
          email
          hideLabel
          required
        />
        <input-text
          ref="password"
          type="password"
          label="Senha"
          placeholder="Senha"
          v-model="user.password"
          minlength="8"
          hideLabel
          required
        />
        <input-text
          ref="confirm_password"
          type="password"
          label="Confirmar Senha"
          placeholder="Confirmar Senha"
          v-model="user.confirm_password"
          minlength="8"
          hideLabel
          required
        />
        <div class="error-message">
          {{ error_message }}
        </div>
        <button type="submit" @click.prevent="register">Registrar</button>
        <div class="login-container__footer">
          Já tem uma conta?
          <RouterLink :to="{ name: 'login' }">Entre aqui</RouterLink>
        </div>
      </form>
    </div>
    <div class="aside">
      <div>
        <img src="@/assets/svg/logo.svg" alt="Lyncas logo" />
        <p>
          Bem-vindo ao Lyncas Sales, uma aplicação <br />
          simples para gerenciar vendas e clientes.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/common/services/user.service";
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
        email: null,
        password: null,
        confirm_password: null,
      },
      error_message: null,
    };
  },
  methods: {
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

      if (this.user.password != this.user.confirm_password)
        return (this.error_message = "Senhas não conferem");

      user
        .create({
          name: this.user.name,
          login: this.user.email,
          password: this.user.password,
          passwordConfirmation: this.user.confirm_password,
        })
        .then((response) => {
          message.success(response.data.message).then(() => {
            this.$router.push({ name: "login" });
          });
        })
        .catch((error) => {
          message.error(error.response.data.notifications[0].message);
        });
    },
  },
};
</script>

<style scoped>
.margin {
  margin-bottom: 0;
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.login-container .aside {
  background-color: var(--primary-color);

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container .aside img {
  width: 24.4rem;
  height: 5.6rem;

  margin-bottom: 6.6rem;
  margin-left: 9.3rem;
}

.login-container p {
  color: var(--gray-100);

  font-weight: 500;
  font-size: 2.4rem;
  line-height: 3.4rem;
  text-align: center;
}

.login-container .main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container :deep(input),
.login-container button {
  display: block;
}

.login-container .main h1 {
  color: var(--text-primary);

  font-weight: 500;
  font-size: 4rem;
  line-height: 5.8rem;
  text-align: center;

  margin-bottom: 5.2rem;
}

.login-container .main :deep(input) {
  color: var(--text-secondary);

  width: 34.5rem;
  height: 3.8rem;

  outline: none;
  padding: 0.4rem 1.8rem;

  background: var(--background-secondary);

  border: 1px solid var(--border);
  border-radius: 0.4rem;

  font-size: 1.6rem;
  margin-top: 1.1rem;
}

.login-container .main :deep(input::placeholder) {
  color: var(--text-secondary);
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.3rem;
}

.login-container .main :deep(input:last-child) {
  margin-bottom: 2.4rem;
}

.login-container .main button {
  margin-top: 1.1rem;

  width: 34.4rem;
  height: 3.9rem;

  background-color: var(--secondary-color);
  color: var(--background-secondary);

  font-weight: 700;
  font-size: 2rem;

  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  gap: 1rem;
}

.login-container .main button:hover {
  filter: brightness(0.9);
}

.login-container__footer {
  color: var(--text-secondary);

  font-size: 1.8rem;
  text-align: center;

  margin-top: 1rem;
}

.login-container__footer a {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .login-container .aside img {
    margin: 3.3rem 8.5rem;
  }

  .login-container .form h1 {
    margin-top: 3.8rem;
  }

  .login-container .main button {
    margin-bottom: 20rem;
  }
}
</style>
