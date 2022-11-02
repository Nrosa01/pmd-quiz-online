<script>
  import QuestionSystem from "./lib/QuestionSystem.svelte";
  import { store, loadData } from "./assets/store.js";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { isTouchEnabled, getLanguage } from "./assets/utils.js";
  import { transition_in } from "svelte/internal";

  $store.numQuestions = 10;
  let musicBg = null;
  let loaded = loadData();
  let isPlaying = false;
  let canStart = false;
  let finishedTransition = false;
  let isSpanish = getLanguage() === "es";

  onMount(() => {
    musicBg.volume = 0.1;
  });

  let pokemons = [
    "bulbasaur",
    "charmander",
    "chikorita",
    "chimchar",
    "cyndaquil",
    "eevee",
    "mudkip",
    "phanpy",
    "pikachu",
    "piplup",
    "riolu",
    "shinx",
    "skitty",
    "squirtle",
    "torchic",
    "totodile",
    "treecko",
    "turtwig",
    "vulpix",
  ];
</script>

<audio
  bind:this="{musicBg}"
  src="audio/quiz-music.ogg"
  type="audio/ogg"
  controls="{false}"
  loop
  preload="auto"></audio>

<section class="hidden">
  {#each pokemons as pokemon}
    <img src="img/pokemonicons/{pokemon}.png" alt="" />
  {/each}
  <img src="img/others/pmdtextbox" alt="" />
</section>

<section>
  <div
    class="fixed h-screen w-screen justify-center bg-cover brightness-75 infinite-scroll-right">
  </div>
  <div
    class="fixed h-screen w-screen justify-center bg-cover brightness-75 opacity-50 infinite-scroll-left">
  </div>
</section>

{#await loaded}
  <div
    class="flex flex-col justify-center items-center text-center h-screen w-screen bg-black/50 z-10">
    <h1 class="text-8xl text-white animate-pulse">{isSpanish ? "Cargando..." : "Loading..."}</h1>
  </div>
{:then data}
  <main class="relative" transition:fade>
    <section>
      {#if canStart}
        {#if finishedTransition}
          <div
            class="flex flex-col flex-wrap h-screen justify-end bg-none"
            transition:fade>
            <QuestionSystem dataExt="{data}" />
          </div>
        {/if}
      {:else}
        <div
          class="flex flex-col flex-wrap h-screen justify-end bg-none"
          on:pointerdown="{() => {
            canStart = true;
          }}"
          transition:fade
          on:outroend="{() => {
            if (!isPlaying) {
              musicBg.play();
              isPlaying = true;
            }
            finishedTransition = true;
          }}">
          <div
            class="flex flex-col justify-center items-center text-center h-screen w-screen bg-black/50 z-10">
            <h1 class="text-4xl lg:text-8xl text-white animate-pulse">
              {isTouchEnabled()
                ? data.strings["TouchToStart"]
                : data.strings["ClickToStart"]}
            </h1>
          </div>
        </div>
      {/if}
    </section>
  </main>
{:catch}
  <div
    class="flex flex-col justify-center items-center text-center h-screen w-screen bg-black/50 z-10"
    transition:fade>
    <h1 class="text-8xl text-white animate-pulse">{isSpanish ? "Error al cargar :(" : "Error promise rejected :("}</h1>
  </div>
{/await}
