<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chart = null;
  let myChart = null;

  onMount(() => {
    const ctx = chart.getContext("2d");
    myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Natures",
            data: [12, 19, 3, 5, 2, 3],
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
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });

  let classes = $$props.classes;
  function clicked()
  {
    myChart.config.data.datasets[0].label = "New Label";
    console.table(myChart.config.data.datasets[0].label)
    myChart.update();
  }
</script>

<div
  class="h-fit min-w-screen dynamicMargin bg-white rounded-xl border-pink-600 border-solid border-8
  hover:border-cyan-500 transition-all"
  on:click={clicked} on:keydown>
  <canvas bind:this={chart}></canvas>
</div>
