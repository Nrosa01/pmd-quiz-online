<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { store, radialChartConfig } from "../assets/store.js";

  let chart = null;
  let myChart = null;
  let minDataValue = 0.05;

  store.subscribe((value) => {
    if (myChart) updateData();
  });

  function updateData() {
    let values = [];

    for (let [key, value] of Object.entries(store.weightedPoints)) {
      values.push(value + minDataValue);
    }

    myChart.data.datasets[0].data = values;

    myChart.update();
  }

  function createData() {
    let labels = [];
    let values = [];

    for (let [key, value] of Object.entries($store.points)) {
      labels.push(key);
      values.push(((value / $store.maxPoints[key]) + minDataValue) / (1 + minDataValue));
    }

    let data = {
      labels: labels,
      datasets: [
        {
          label: $store.strings['radarChartLabel'],
          lineTension: 0.1,
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  }

  function createChart() {
    const ctx = chart.getContext("2d");
    let options = radialChartConfig;
    options.plugins.title.text = $store.strings['radarChartLabel'];

    myChart = new Chart(ctx, {
      type: "radar",
      data: createData(),
      options: options,
    });
  }

  onMount(() => {
    createChart();
  });

  let classes = $$props.class;
</script>

<div
  class="h-fit min-w-screen rounded-xl p-2 transition-all text-box {classes}">
  <canvas bind:this="{chart}"></canvas>
</div>
