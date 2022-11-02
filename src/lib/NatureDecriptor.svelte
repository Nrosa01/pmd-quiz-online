<script>
  import { onMount } from "svelte";
  import { slide, fade } from "svelte/transition";
  import { store } from "../assets/store.js";

  let descriptions = null;
  let index = 0;
  export let finish = false;
  let startTransition = false;

  function getDescriptions(description) {
    let descriptions = [];
    let sentences = description.split(".");

    for (let i = 0; i < sentences.length; i++) {
      if (sentences[i].length <= 1) continue;

      if (i === sentences.length - 1) {
        descriptions.push(sentences[i]);
      } else {
        descriptions.push(sentences[i] + "...");
      }
    }

    return descriptions;
  }

  function onPointerDown()
  {
    index++;

    if(index >= descriptions.length)
    {
      startTransition = true;
      index = descriptions.length - 1;
    }
  }

  store.subscribe((value) => {
    getBestNature();
  });

  function getBestNature() {
    let max = 0;
    let maxNature = "";
    let maxNatures = [];

    if (store.weightedPoints == null) return;

    // First step, order the natures by their score
    let orderedNatures = Object.keys(store.weightedPoints).sort(
      (a, b) => store.weightedPoints[b] - store.weightedPoints[a]
    );

    // Second step, add the natures with the highest score to the array
    for (let nature of orderedNatures) {
      if (store.weightedPoints[nature] >= max) {
        max = store.weightedPoints[nature];
        maxNature = nature;
        maxNatures.push(maxNature);
      }
    }

    descriptions = getDescriptions($store.natureDescription[maxNature]);
  }


  let text;
</script>

{#if !startTransition}
<section class="select-none z-50">
  <div
    class="flex flex-col w-screen h-screen text-center justify-center items-center bg-black/[0.65]"
    on:pointerdown="{() => onPointerDown()}"
    transition:fade
    on:outroend="{() => finish = true}">
    {#key index}
    <h1 bind:this={text} class="text-yellow-50 text-base sm:text-xl md:text-4xl pointer-events-none w-[75%] select-none"
    transition:slide>
      {descriptions[index]}
    </h1>
    {/key}
    <div class="arrow-down animate-pulse"></div>
  </div>
</section>
{/if}
