import { Api } from "./api.js";
import { options, sortByMonths } from "../helper.js";

const api = new Api();

export const createDashboard = async () => {
  const customerResponse = await api.get("Customer");
  const saleResponse = await api.get("Sale");
  let total = 0;

  for (let sale of saleResponse.data) total += sale.totalValue;

  document.querySelector(".highlight--billing").innerHTML = Number(
    total
  ).toLocaleString("pt-BR", options);

  document.querySelector(".highlight--customers").innerHTML =
    customerResponse.data.length;

  document.querySelector(".highlight--sales").innerHTML =
    saleResponse.data.length;

  const createCharts = async () => {
    const response = await api.get("Sale");

    const sortedArray = response.data.sort(
      (a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue)
    );

    const sortedByMonthsArray = sortByMonths(response.data);

    new Chart(document.getElementById("line-chart"), {
      type: "line",
      data: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
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
              282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267, 809, 947,
              1402,
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
        labels: [
          sortedArray[0].customer.split(" ")[0],
          sortedArray[1].customer.split(" ")[0],
          sortedArray[2].customer.split(" ")[0],
          sortedArray[3].customer.split(" ")[0],
          sortedArray[4].customer.split(" ")[0],
        ],
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
            data: [
              sortedArray[0].totalValue,
              sortedArray[1].totalValue,
              sortedArray[2].totalValue,
              sortedArray[3].totalValue,
              sortedArray[4].totalValue,
            ],
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
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            label: "2022",
            backgroundColor: "#3e95cd",
            data: [
              sortedByMonthsArray[0].reduce((sum, i) => sum + i),
              sortedByMonthsArray[1].reduce((sum, i) => sum + i),
              sortedByMonthsArray[2].reduce((sum, i) => sum + i),
              sortedByMonthsArray[3].reduce((sum, i) => sum + i),
              sortedByMonthsArray[4].reduce((sum, i) => sum + i),
              sortedByMonthsArray[5].reduce((sum, i) => sum + i),
              sortedByMonthsArray[6].reduce((sum, i) => sum + i),
              sortedByMonthsArray[7].reduce((sum, i) => sum + i),
              sortedByMonthsArray[8].reduce((sum, i) => sum + i),
              sortedByMonthsArray[9].reduce((sum, i) => sum + i),
              sortedByMonthsArray[10].reduce((sum, i) => sum + i),
              sortedByMonthsArray[11].reduce((sum, i) => sum + i),
            ],
          },
          {
            label: "2021",
            backgroundColor: "#8e5ea2",
            data: [
              sortedByMonthsArray[0].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[1].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[2].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[3].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[4].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[5].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[6].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[7].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[8].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[9].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[10].reduce((sum, i) => sum + i) / 1.25,
              sortedByMonthsArray[11].reduce((sum, i) => sum + i) / 1.25,
            ],
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
        scales: {
          y: {
            min: 0,
            max: 20000,
          },
        },
      },
    });
  };

  setTimeout(createCharts, 100);
};
