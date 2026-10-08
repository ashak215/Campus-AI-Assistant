document.addEventListener("DOMContentLoaded", function () {
  const performanceChart = document.getElementById("performanceChart");
  const riskChart = document.getElementById("riskChart");
  const riskTrendChart = document.getElementById("riskTrendChart");

  if (performanceChart && window.Chart) {
    new Chart(performanceChart, {
      type: "line",
      data: {
        labels: ["2022", "2023", "2024", "2025", "2026"],
        datasets: [{
          label: "Overall Academic Performance",
          data: [68, 72, 76, 79, 83],
          borderColor: "#6d5ef8",
          backgroundColor: "rgba(109, 94, 248, 0.12)",
          borderWidth: 3,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#6d5ef8",
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.38
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (context) { return `${context.dataset.label}: ${context.parsed.y}%`; } } }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#5d678a" }
          },
          y: {
            min: 60,
            max: 90,
            ticks: {
              callback: function (value) { return `${value}%`; },
              color: "#5d678a"
            },
            grid: { color: "rgba(107, 120, 153, 0.12)" }
          }
        }
      }
    });
  }

  if (riskChart && window.Chart) {
    new Chart(riskChart, {
      type: "bar",
      data: {
        labels: ["2022", "2023", "2024", "2025", "2026"],
        datasets: [
          {
            label: "Low Risk",
            data: [60, 65, 70, 74, 78],
            backgroundColor: "#61d3a4",
            stack: "risk"
          },
          {
            label: "Medium Risk",
            data: [25, 23, 21, 19, 17],
            backgroundColor: "#ffb86c",
            stack: "risk"
          },
          {
            label: "High Risk",
            data: [15, 12, 9, 7, 5],
            backgroundColor: "#ff7a90",
            stack: "risk"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: { callbacks: { label: function (context) { return `${context.dataset.label}: ${context.parsed.y}%`; } } }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: "#5d678a" }
          },
          y: {
            stacked: true,
            min: 0,
            max: 100,
            ticks: {
              callback: function (value) { return `${value}%`; },
              color: "#5d678a"
            },
            grid: { color: "rgba(107, 120, 153, 0.12)" }
          }
        }
      }
    });
  }

  if (riskTrendChart && window.Chart) {
    new Chart(riskTrendChart, {
      type: "line",
      data: {
        labels: ["2022", "2023", "2024", "2025", "2026", "2027"],
        datasets: [{
          label: "High Risk Trend",
          data: [15, 12, 9, 7, 5, 3],
          borderColor: "#ff7a90",
          backgroundColor: "rgba(255, 122, 144, 0.12)",
          borderWidth: 3,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#ff7a90",
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.42
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (context) { return `High Risk: ${context.parsed.y}%`; } } }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#5d678a" }
          },
          y: {
            min: 0,
            max: 20,
            ticks: {
              callback: function (value) { return `${value}%`; },
              color: "#5d678a"
            },
            grid: { color: "rgba(107, 120, 153, 0.12)" }
          }
        }
      }
    });
  }
});
