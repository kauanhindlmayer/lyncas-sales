import moment from "moment";
// import useUserStore from "@/stores/user";
import router from "@/router";
import message from "@/common/utils/message.js";

// const store = useUserStore();

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

const formatCurrency = (money) => {
  return Number(money).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const handleExpiredToken = () => {
  // store.removeAuthenticationData();

  message.alert("Sua sessão expirou.");

  router.push({ name: "login" });
};

export default {
  formatDate,
  formatCurrency,
  handleExpiredToken,
};
