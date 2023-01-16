import { removeToken, removeUsername } from "../services/jwt.service";
import useUserStore from "../stores/user";
import router from "../router";

export const formatString = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export const formatNumber = (string) => {
  return Number(string).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const handleExpiredToken = () => {
  removeToken();
  removeUsername();

  useUserStore().$reset();

  alert("Sua sessão expirou.");

  router.push("/conectar-se");
};
