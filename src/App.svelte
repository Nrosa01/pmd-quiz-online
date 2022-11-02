<script>
  import QuestionSystem from "./lib/QuestionSystem.svelte";
  import { store } from "./assets/store.js";
  import { onMount } from "svelte";

  $store.numQuestions = 3;
  let musicBg = null;

  onMount(() => {
    musicBg.volume = 0.2;
  });
</script>

{#if $store.questions && $store.natures}
  <main class="relative">
    <section>
      <audio
        bind:this="{musicBg}"
        src="audio/quiz-music.ogg"
        type="audio/ogg"
        controls="{false}"
        loop
        autoplay
        preload="auto"></audio>

      <div
        class="fixed h-screen w-screen justify-center bg-cover brightness-75 infinite-scroll-right">
      </div>
      <div
        class="fixed h-screen w-screen justify-center bg-cover brightness-75 opacity-50 infinite-scroll-left">
      </div>
    </section>

    <section>
      <div class="flex flex-col flex-wrap h-screen justify-end bg-none">
        <QuestionSystem />
      </div>
    </section>
  </main>
{:else}
  <div
    class="flex flex-col justify-center items-center text-center h-screen w-screen bg-black/90 z-10">
    <h1 class="text-8xl text-white">Loading...</h1>
  </div>
{/if}
