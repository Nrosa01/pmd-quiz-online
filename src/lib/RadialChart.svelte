<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { store } from "../assets/store.js";

  let chart = null;
  let myChart = null;

  store.subscribe((value) => {
    if (myChart) updateData();
  });

  function updateData() {
    let values = [];

    for (let [key, value] of Object.entries($store.points)) {
      values.push(value / $store.maxPoints[key]);
    }

    myChart.data.datasets[0].data = values;

    myChart.update();
  }

  function createData() {
    let labels = [];
    let values = [];

    for (let [key, value] of Object.entries($store.points)) {
      labels.push(key);
      values.push(value / $store.maxPoints[key]);
    }

    let data = {
      labels: labels,
      datasets: [
        {
          label: "Natures",
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }

  function createChart() {
    const ctx = chart.getContext("2d");
    myChart = new Chart(ctx, {
      type: "radar",
      data: createData(),
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  onMount(() => {
    createChart();
  });

  let classes = $$props.classes;
</script>

<div
  class="h-fit min-w-screen dynamicMargin bg-white rounded-xl border-pink-600 border-solid border-8
  hover:border-cyan-500 transition-all">
  <canvas bind:this="{chart}"></canvas>
</div>
