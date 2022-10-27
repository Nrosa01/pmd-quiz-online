<svelte:options accessors="{true}" />

<script>
  import { onMount } from "svelte";
  import { store } from "../assets/store.js";

  export let answer;
  export let responses;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let clicked = false;
  $: classes = `transition duration-200 ease-in-out ${
    clicked ? "scale-110" : "scale-100"
  }`;

  export const click = () => {
    onClick();
  };

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

    dispatch("message", {
      id: answer.id,
    });
  }
</script>

<div class="h-fit wmin-w-screen dynamicMargin dynamicText my-1 ">
  <button
    on:click="{onClick}"
    class="relative text-box dynamicWidth float-right {classes}">
    <h1 class="text-white">{answer.response}</h1>
  </button>
</div>
