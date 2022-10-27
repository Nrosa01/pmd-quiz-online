<script>
  import Carousel from "svelte-carousel";
  import data from "../assets/dataEs.json";
  import Question from "./Question.svelte";

  let carousel = null;

  function onCorrectQuestion(event) {
    carousel.goToNext();
  }
</script>

<Carousel
  bind:this="{carousel}"
  dots={false}
  arrows={false}
  swiping={false}
  >
  {#each data as question (question.id)}
    <Question
      on:correctQuestion="{onCorrectQuestion}"
      questionData="{data[question.id]}" />
  {/each}
</Carousel>
