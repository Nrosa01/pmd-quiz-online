<script>
    import { onMount } from "svelte";
  import Answer from "./Answer.svelte";

  export let questionData = {};
  export let answerComponents = new Array(questionData.responses.length);

  function handleMessage(event) {
		//alert(event.detail.id);
    updateModelStatus(event.detail.id);
	}

  function updateModelStatus(id)
  {
    // Get the clicked button
    let clickedButton = answerComponents[id];

    // If the clicked button wasn't clicked before and it's now, check other buttons
    if(clickedButton.clicked)
      for(let i = 0; i < answerComponents.length; i++)
        if(answerComponents[i].clicked && i != id)
          answerComponents[i].click();
  }

</script>

{#each questionData.responses as answer (answer.id)}
  <Answer bind:this={answerComponents[answer.id]} on:message={handleMessage} responses={questionData.responses} answer="{answer}" />
{/each}

<div class="text-box min-w-screen my-2 dynamicMargin dynamicText">
  <h1 class="text-white">{questionData.title}</h1>
</div>