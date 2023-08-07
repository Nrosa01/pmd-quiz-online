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
    setTimeout(() => {
      window.scrollTo({top: document.body.scrollHeight, behavior:"smooth"});
    }, 100);
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
    <h1 class="text-8xl text-white animate-pulse">
      {isSpanish ? "Cargando..." : "Loading..."}
    </h1>
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
          transition:fade
          on:outroend="{() => {
            if (!isPlaying) {
              musicBg.play();
              isPlaying = true;
            }
            finishedTransition = true;
          }}">
          <div
            class="flex flex-col select-none justify-center items-center text-center h-[45vh] w-screen bg-black/50 hover:bg-black/60 transition-all duration-300 z-10"
            on:click="{() => {
              canStart = true;
            }}" on:keydown>
            <h1 class="text-4xl lg:text-8xl text-white animate-pulse">
              {data.strings["NormalMode"]}
            </h1>
            <h1 class="text-2xl lg:text-4xl text-white/75">
              {data.strings["10"]}
            </h1>
          </div>
          <div
            class="flex flex-col select-none justify-center items-center text-center h-[45vh] w-screen bg-black/50 hover:bg-black/60 transition-all duration-300 z-10"
            on:click="{() => {
              canStart = true;
              $store.numQuestions = -1;
            }}" on:keydown>
            <h1 class="text-4xl lg:text-8xl text-white animate-pulse">
              {data.strings["FullMode"]}
            </h1>
            <h1 class="text-2xl lg:text-4xl text-white/75">
              {data.strings["63"]}
            </h1>
          </div>
          <div
          class="flex flex-col select-none justify-center items-center text-center h-[10vh] w-screen bg-black/50 hover:bg-black/60 transition-all duration-300 z-10"
          on:click="{() => {
            window.open("https://twitter.com/rionisguild", "_blank");
          }}" on:keydown>
          <p class="text-sm lg:text-2xl text-white/75 underline">
          {data.strings["Credits"]}
          </p>
        </div>
        </div>
      {/if}
    </section>
  </main>
{:catch error}
  <div
    class="flex flex-col justify-center items-center text-center h-screen w-screen bg-black/50 z-10"
    transition:fade>
    <h1 class="text-8xl text-white animate-pulse">
      {isSpanish ? "Error al cargar :(" : "Error promise rejected :("}
      {error.message}
    </h1>
  </div>
{/await}
