<script>
  import Answer from "./Answer.svelte";

  export let questionData = {};
</script>

{#each questionData.responses as answer}
  <Answer answer="{answer}" />
{/each}

<div class="text-box min-w-screen my-2 dynamicMargin dynamicText">
  <h1 class="text-white">{questionData.title}</h1>
</div>