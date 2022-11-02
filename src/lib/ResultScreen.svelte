<script>
  import RadialChart from "./RadialChart.svelte";
  import { store } from "../assets/store.js";
  import { fade } from "svelte/transition";
  import { transition_out } from "svelte/internal";

  $: strings = $store.strings;
  let imagesSrc = [];

  store.subscribe((value) => {
    calculateImages();
  });

  function calculateImages() {
    // ImagesSrc are the natures with the highest score of weightedPoints
    // ImageSrc is calculated using store.naturetopokemon that returns an array of strings
    // To each of those string we append the path to the image that is img/pokemonicons/ + string + .png

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

    imagesSrc = [];

    if (maxNature.length === 0) return;

    // Convert nature to imageSrc iterate maxNatures array
    // Create set to avoid duplicates
    let set = new Set();
    for (let i = 0; i < maxNatures.length; i++) {
      let nature = maxNatures[i];
      let pokemons = $store.natureToPokemon[nature];

      for (let [key, value] of Object.entries(pokemons)) {
        let valueLower = value.toLowerCase();
        
        if (!set.has(valueLower)) {
          set.add(valueLower);
          imagesSrc.push("img/pokemonicons/" + valueLower + ".png");
        }
      }
    }
  }

  function restart() {
    location.reload();
  }

  let doTransition = false;
</script>

{#if !doTransition}
  <section transition:fade class="z-50" on:outroend="{() => restart()}">
    <!-- Using Tailwind CSS, build a grid that divides screen in half. The right grid is vertically divied in other two sections -->
    <div class="grid lg:grid-cols-2 h-screen w-screen">
      <!-- Left grid -->
      <div
        class="bg-black/50 flex flex-col flex-wrap justify-end lg:justify-center items-center pt-2">
        <h1 class="text-white text-box select-none p-0 mb-4 w-[80%] lg:w-[90%]">
          {strings["ResultMessage"]}
        </h1>
        <!-- Row of images -->
        <div
          class="flex flex-row flex-wrap justify-center items-center w-[90%] gap-4 pointer-events-none select-none pb-4">
          {#each imagesSrc as source}
            <img
              src="{source}"
              alt=""
              class="w-[25%] rendering-pixelated img-box" />
          {/each}
        </div>
        <button
          on:click="{() => {
            doTransition = true;
          }}"
          class="text-white select-none text-box p-0 my-4 leading-none lg:h-fit w-[40%] lg:w-[30%] hidden lg:block"
          >{strings["Restart"]}</button>
      </div>
      <!-- Right grid -->
      <div
        class="bg-black/50 flex flex-col flex-wrap justify-start lg:justify-center items-center pb-2">
        <RadialChart class="w-[75%] m-0 p-0" />

        <button
        on:click="{() => {
          doTransition = true;
        }}"
        class="text-white select-none text-box p-0 my-4 w-[75%] lg:w-[30%] block lg:hidden"
        >{strings["Restart"]}</button>
      </div>
    </div>
  </section>
{:else}
  <section transition:fade>
    <div class="fixed right-0 top-0 w-screen h-screen bg-black"></div>
  </section>
{/if}
