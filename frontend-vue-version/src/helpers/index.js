export const toLocaleDateString = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export const toLocaleString = (string) => {
  return string.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
