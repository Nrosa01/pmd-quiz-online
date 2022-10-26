<script>
  import DebugNature from "./lib/DebugNature.svelte";
  import QuestionSystem from "./lib/QuestionSystem.svelte";

  let fadeInOnScroll = "motion-safe:animate-fadeIn";
</script>

<div
  class="fixed h-screen w-screen justify-center bg-cover bg-[url(background.png)]">
</div>
<main class="relative">
  <div class="flex flex-col flex-wrap h-screen justify-end">
    <DebugNature />
    <QuestionSystem />
  </div>
</main>
