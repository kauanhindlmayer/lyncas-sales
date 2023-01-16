import { api } from "./api.service.js";
import { sortByMonths, monthsOfTheYear } from "../helper.js";

export const createDashboard = async () => {
  const customerResponse = await api.get("Customer/listar");
  const saleResponse = await api.get("Sale/listar");

  if (!customerResponse.success || !saleResponse.success) {
    alert("Um erro inesperado aconteceu. Tente novamente mais tarde.");
    return;
  }

  let total = 0;

  for (let sale of saleResponse.data) total += sale.totalValue;

  document.querySelector(".highlight--billing").innerHTML = Number(
    total
  ).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  document.querySelector(".highlight--customers").innerHTML =
    customerResponse.data.length;

  document.querySelector(".highlight--sales").innerHTML =
    saleResponse.data.length;

  const sortedArray = saleResponse.data.sort(
    (a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue)
  );

  const sortedByMonthsArray = sortByMonths(saleResponse.data);

  new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: monthsOfTheYear,
      datasets: [
        {
          data: [
            86, 114, 106, 106, 107, 111, 133, 221, 783, 2478, 133, 221, 783,
          ],
          label: "Produto 1",
          borderColor: "#3e95cd",
          fill: false,
        },
        {
          data: [
            282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267, 809, 947, 1402,
          ],
          label: "Produto 2",
          borderColor: "#8e5ea2",
          fill: false,
        },
        {
          data: [
            168, 170, 178, 190, 203, 276, 408, 547, 675, 734, 203, 276, 408,
          ],
          label: "Produto 3",
          borderColor: "#3cba9f",
          fill: false,
        },
        {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784, 38, 74, 167],
          label: "Produto 4",
          borderColor: "#e8c3b9",
          fill: false,
        },
        {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433, 82, 172, 384],
          label: "Produto 5",
          borderColor: "#c45850",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Receita Mensal por Produtos",
        },
      },
    },
  });
  new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: sortedArray
        .map((sale) => sale.customer.split(" ")[0])
        .slice(0, 5),
      datasets: [
        {
          label: "R$",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
          ],
          data: sortedArray.map((sale) => sale.totalValue).slice(0, 5),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Maiores Receitas por Clientes",
        },
      },
    },
  });

  new Chart(document.getElementById("bar-chart-grouped"), {
    type: "bar",
    data: {
      labels: monthsOfTheYear,
      datasets: [
        {
          label: "2022",
          backgroundColor: "#3e95cd",
          data: sortedByMonthsArray,
        },
        {
          label: "2021",
          backgroundColor: "#8e5ea2",
          data: sortedByMonthsArray.map((value) => value / 1.25),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Receita Mensal",
        },
      },
    },
  });
};
