import jwtService from "@/common/services/jwt.service";
import useUserStore from "@/stores/user";
import router from "@/router";
import moment from "moment";

const formatDate = (date) => {
  return moment(date).format("dd-MM-yyyy");
};

const formatCurrency = (money) => {
  return Number(money).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const handleExpiredToken = () => {
  jwtService.removeToken();
  jwtService.removeUsername();

  useUserStore().$reset();

  alert("Sua sessão expirou.");

  router.push("/conectar-se");
};

export default {
  formatDate,
  formatCurrency,
  handleExpiredToken,
};
