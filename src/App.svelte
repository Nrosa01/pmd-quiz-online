<script>
  import DebugNature from "./lib/DebugNature.svelte";
  import QuestionSystem from "./lib/QuestionSystem.svelte";
  import { store } from "./assets/store.js";

  $store.numQuestions = -1;

  let fadeInOnScroll = "motion-safe:animate-fadeIn";
</script>

<div
  class="fixed h-screen w-screen justify-center bg-cover brightness-75 infinite-scroll-right">
</div>
<div
  class="fixed h-screen w-screen justify-center bg-cover brightness-75 opacity-50 infinite-scroll-left">
</div>
<main class="relative">
  <div class="flex flex-col flex-wrap h-screen justify-end">
    <DebugNature />
    <QuestionSystem />
  </div>
</main>
