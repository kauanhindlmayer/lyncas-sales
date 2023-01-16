<template>
  <div class="login-container">
    <div class="main">
      <vee-form class="form" :validation-schema="schema" @submit="register">
        <h1>Criar conta</h1>
        <!-- Name -->
        <vee-field
          name="name"
          type="text"
          class="input field"
          placeholder="Nome"
          label="nome"
        />
        <ErrorMessage class="error-message" name="name" />
        <!-- E-mail -->
        <vee-field
          name="email"
          type="email"
          class="input field email"
          placeholder="E-mail"
        />
        <ErrorMessage class="error-message" name="email" />
        <!-- Password -->
        <vee-field
          name="password"
          type="password"
          class="input field"
          placeholder="Senha"
          label="senha"
        />
        <ErrorMessage class="error-message" name="password" />
        <!-- Confirm Password -->
        <vee-field
          name="confirm_password"
          type="password"
          class="input field"
          placeholder="Confirmar Senha"
          label="confirmar senha"
        />
        <ErrorMessage class="error-message" name="confirm_password" />

        <button type="submit">Registrar</button>
        <div class="login-container__footer">
          Já tem uma conta?
          <RouterLink :to="{ name: 'login' }">Entre aqui</RouterLink>
        </div>
      </vee-form>
    </div>
    <div class="aside">
      <div>
        <img src="../assets/svg/logo.svg" alt="Lyncas logo" />
        <p>
          Bem-vindo ao Lyncas Sales, uma aplicação <br />
          simples para gerenciar vendas e clientes.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { user } from "../services/user.service";
import router from "../router";

export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        password: "required|min:8|max:100|excluded:password",
        confirm_password: "passwords_mismatch:@password",
      },
    };
  },
  methods: {
    register(values) {
      user
        .create({
          name: values.name,
          login: values.email,
          password: values.password,
          passwordConfirmation: values.confirm_password,
        })
        .then((response) => {
          router.push({ name: "login" });
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.notifications[0].message);
        });
    },
  },
};
</script>

<style>
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

.login-container input,
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

.login-container .main input {
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

.login-container .main input::placeholder {
  color: var(--text-secondary);
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.3rem;
}

.login-container .main input:last-child {
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
