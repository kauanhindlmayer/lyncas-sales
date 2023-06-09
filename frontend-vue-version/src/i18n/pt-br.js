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
    SUCCESS: "Sucesso",
    SUCCESSFULLY_REGISTERED: "Registrado com Sucesso!",
    ERROR: "Erro",
    UNEXPECTED_ERROR: "Ocorreu um erro inesperado!",
    ALERT: "Aviso",
    CONFIRM: "Confirmar",
    CONFIRM_ACTION: "Tem certeza que deseja executar esta ação?",
    YES: "Sim",
    NO: "Não",
    WANT_TO_LEAVE: "Deseja realmente sair?",
    CHECK_UNSAVED: "Você tem alterações não salvas. deseja realmente sair?",
    CURRENT_PAGE_REPORT:
      "Mostrando {first} a {last} de {totalRecords} registros",
  },
  VALIDATION_FIELDS: {
    INVALID: "O campo {label} é inválido",
    REQUIRED: "Por favor informe o campo {label}",
    TOS: "É necessário aceitar os termos e condições",
    LOGIN_INVALIDO: "Login inválido",
    MIN_LENGTH: "Comprimento mínimo do campo de {length} caracteres",
    MAX_LENGTH: "Comprimento máximo do campo de {length} caracteres",
    MIN_VALUE: "Valor mínimo do campo é de {min}",
    MAX_VALUE: "Valor máximo do campo é de {max}",
    PASSWORD_CONFIRMATION: "As senhas digitadas não são iguais",
    CAMPOS_NAO_PREENCHIDOS:
      "Ainda existem campos obrigatórios que não foram preenchidos.",
  },
};
