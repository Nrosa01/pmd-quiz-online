<script>
  import DebugNature from "./lib/DebugNature.svelte";
  import QuestionSystem from "./lib/QuestionSystem.svelte";
  import { store } from "./assets/store.js";

  $store.numQuestions = 3;
</script>

<div
  class="fixed h-screen w-screen justify-center bg-cover brightness-75 infinite-scroll-right -z-10">
</div>
<div
  class="fixed h-screen w-screen justify-center bg-cover brightness-75 opacity-50 infinite-scroll-left -z-10">
</div>

{#if $store.questions && $store.natures}
  <main class="relative">
    <div class="flex flex-col flex-wrap h-screen justify-end">
      <QuestionSystem />
    </div>
  </main>
{:else}
  <div
    class="flex flex-col justify-center items-center text-center h-screen w-screen bg-black/90 z-10">
    <h1 class="text-8xl text-white">Loading...</h1>
  </div>
{/if}
