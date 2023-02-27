import { Customer } from "./customer/pt-br.js";
import { Sale } from "./sale/pt-br.js";

export const br = {
  CUSTOMER: {
    ...Customer,
  },
  SALE: {
    ...Sale,
  },
  GENERAL: {
    WELCOME: "Bem-vindo a Lyncas",
    NAME: "Nome",
    EMAIL: "E-mail",
    PASSWORD: "Senha",
    CONFIRM_PASSWORD: "Confirmar Senha",
    DESCRIPTION:
      "Bem-vindo ao Lyncas Sales, uma aplicação <br> simples para gerenciar vendas e clientes.",
    SIGN_IN: "Entrar",
    LOGIN: "Login",
    ALREADY_HAVE_AN_ACCOUNT: "Já tem uma conta?",
    SIGN_UP: "Inscreva-se",
    DONT_HAVE_AN_ACCOUNT: "Não tem uma conta?",
    CREATE_ACCOUNT: "Criar Conta",
    CREATE: "Criar",
    PAGE_NOT_FOUND: "Página não encontrada :(",
    PAGE_NOT_FOUND_DESCRIPTION:
      "A página que você tentou acessar está indisponível ou não existe.",
    GREET: "Olá, ",
    LOGOUT: "Sair",
    DASHBOARD: "Dashboard",
    CUSTOMERS: "Clientes",
    SALES: "Vendas",
    ADD: "Adicionar",
    BACK: "Voltar",
    SAVE: "Salvar",
    DELETE: "Deletar",
    EDIT: "Editar",
  },
};
