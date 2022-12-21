import { Api } from "./api.js";
import { options } from "../helper.js";

const api = new Api();

export const createDashboard = async () => {
  const customerResponse = await api.get("Customer");
  const saleResponse = await api.get("Sale");
  let total = 0;

  for (let sale of saleResponse.data) total += sale.totalValue;

  document.querySelector(".highlight--billing").innerHTML = 
    Number(total).toLocaleString("pt-BR", options);

  document.querySelector(".highlight--customers").innerHTML =
    customerResponse.data.length;

  document.querySelector(".highlight--sales").innerHTML =
    saleResponse.data.length;

  const createCharts = () => {
    new Chart(document.getElementById("line-chart"), {
      type: "line",
      data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false,
          },
          {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false,
          },
          {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: "Europe",
            borderColor: "#3cba9f",
            fill: false,
          },
          {
            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
            label: "Latin America",
            borderColor: "#e8c3b9",
            fill: false,
          },
          {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
            label: "North America",
            borderColor: "#c45850",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "World population per region (in millions)",
        },
      },
    });

    new Chart(document.getElementById("doughnut-chart"), {
      type: "doughnut",
      data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
            ],
            data: [2478, 5267, 734, 784, 433],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
      },
    });

    new Chart(document.getElementById("bar-chart-grouped"), {
      type: "bar",
      data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [
          {
            label: "Africa",
            backgroundColor: "#3e95cd",
            data: [133, 221, 783, 2478],
          },
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408, 547, 675, 734],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Population growth (millions)",
        },
      },
    });
  };

  setTimeout(createCharts, 100);
};
