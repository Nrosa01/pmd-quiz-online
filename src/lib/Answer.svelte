<svelte:options accessors="{true}" />

<script>
  import { store } from "../assets/store.js";
  import { createEventDispatcher } from "svelte";

  export let answer;

  const dispatch = createEventDispatcher();

  export let clicked = false;
  export let disabled = false;
  $: classes = `transition duration-200 ease-in-out ${clicked ? "scale-110" : "scale-100"}
                ${disabled ? "brightness-50" : "brightness-100"}`; 

  export const click = () =>
  {
    onClick(false);
  };

  function onClick(sendMessage = true) {
    // Update stores
    answer.scores.forEach((score) => {
      let nature = score.nature;
      let points = score.points;

      let sign = clicked ? -1 : 1;
      $store.points[nature] += sign * points;
    });

    // Toggle clicked
    clicked = !clicked;

    if(!sendMessage) return;

    clickSound.play();

    dispatch("message", {
      id: answer.id,
    });
  }

  function sendMessage(event) {
    const type = event.type;
    dispatch("event", {
        id: answer.id,
        type: type
    })
  }

  let clickSound;
</script>

<div
  class="h-fit min-w-screen dynamicMargin dynamicText transitiona-all duration-200  {clicked
    ? 'my-2'
    : 'my-1'}">
  <audio bind:this={clickSound} src="audio/selectSound.mp3" type="audio/mp3" controls={false} preload="auto"></audio>
  <button
    on:click="{onClick}"
    on:mouseenter="{sendMessage}"
    on:mouseleave="{sendMessage}"
    class="relative text-box dynamicWidth {classes}">
    <h1 class="text-white select-none">{answer.response}</h1>
  </button>
</div>
