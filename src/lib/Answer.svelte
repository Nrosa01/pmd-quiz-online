<script>
  import { store } from "../assets/store.js";

  export let answer;
  let clicked = false;
  $: classes = `${clicked ? "scale-[1.5]" : "scale-100"}`;

  function onClick() {
    // Update stores
    answer.scores.forEach((score) => {
      let nature = score.nature;
      let points = score.points;

      let sign = clicked ? -1 : 1;
      $store.points[nature] += sign * points;
    });

    // Toggle clicked
    clicked = !clicked;
  }
</script>

<div class="h-fit wmin-w-screen dynamicMargin dynamicText my-1 ">
  <button
    on:click="{onClick}"
    class="relative text-box dynamicWidth float-right {classes}">
    <h1 class="text-white">{answer.response}</h1>
  </button>
</div>
