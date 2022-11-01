<script>
  import { onMount } from "svelte";
  import { slide, fade } from "svelte/transition";
  import { store } from "../assets/store.js";

  let description = $store.natureDescription["Grosera"];
  let descriptions = getDescriptions(description);
  let index = 0;
  export let finish = false;

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
      finish = true;
      index = descriptions.length - 1;
    }
  }

  let text;
</script>

<section>
  <div
    class="flex flex-col w-screen h-screen text-center justify-center items-center bg-black/[0.65]"
    on:pointerdown="{() => onPointerDown()}"
    transition:fade>
    {#key index}
    <h1 bind:this={text} class="text-yellow-50 text-4xl pointer-events-none w-[75%] select-none"
    transition:slide>
      {descriptions[index]}
    </h1>
    {/key}
    <div class="arrow-down animate-pulse"></div>
  </div>
</section>
