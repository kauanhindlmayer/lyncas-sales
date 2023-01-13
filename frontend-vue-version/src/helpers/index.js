export const formatString = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export const formatNumber = (string) => {
  return Number(string).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
