<script>
  import Answer from "./Answer.svelte";
  import { createEventDispatcher } from "svelte";
  import { custom_event } from "svelte/internal";

  const dispatch = createEventDispatcher();

  export let questionData = {};
  export let answerComponents = new Array(questionData?.responses.length);

  function handleMessage(event) {
    //alert(event.detail.id);
    updateModelStatus(event.detail.id);
  }

  function updateModelStatus(id) {
    // Get the clicked button
    let clickedButton = answerComponents[id];

    // If the clicked button wasn't clicked before and it's now, check other buttons
    if (clickedButton.clicked) {
      for (let i = 0; i < answerComponents.length; i++) {
        if (answerComponents[i].clicked && i != id) answerComponents[i].click();
        if (i != id) answerComponents[i].disabled = true;
      }

      dispatch("correctQuestion");
    }
  }

  function handleEvent(event) {
    if (event.detail.type == "mouseenter") {
      for (let i = 0; i < answerComponents.length; i++)
        answerComponents[i].disabled = i != event.detail.id;
    } else if (event.detail.type == "mouseleave") {
      answerComponents.forEach((answer) => {
        answer.disabled = false;
      });

      let buttonClicked = answerComponents.find((button) => button.clicked);
      if (buttonClicked) onLeaveGroupOfButtons();
    }
  }

  function onLeaveGroupOfButtons() {
    // If there is a button clicked, disable all the other buttons and enable the clicked one
    let clickedButton = answerComponents.find((button) => button.clicked);
    if (clickedButton) {
      answerComponents.forEach((button) => {
        button.disabled = button != clickedButton;
      });
    }
  }
</script>

<div class="flex flex-col justify-end">
  {#each questionData.responses as answer (answer.id)}
    <Answer
      bind:this="{answerComponents[answer.id]}"
      on:message="{handleMessage}"
      on:event="{handleEvent}"
      responses="{questionData.responses}"
      answer="{answer}" />
  {/each}

  <div
    class="text-box min-w-screen mt-2 mb-1 dynamicMargin dynamicText cursor-default">
    <h1 class="text-white select-none">{questionData.title}</h1>
  </div>
</div>
