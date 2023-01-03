export const toLocaleDateString = (date) => {
  return new Date(date.slice(0, 10)).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
};

export const toLocaleString = (string) => {
  return string.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
