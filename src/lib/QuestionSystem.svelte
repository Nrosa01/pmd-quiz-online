<script>
  import Carousel from "svelte-carousel";
  import Question from "./Question.svelte";
  import { store } from "../assets/store.js";
  import { slide } from "svelte/transition";

  import * as utils from "../assets/utils.js";
  import { onMount } from "svelte";
  import NatureDecriptor from "./NatureDecriptor.svelte";
    import ResultScreen from "./ResultScreen.svelte";

  let data = $store.questions;
  let numberOfQuestions = $store.numQuestions;
  let questions = [];

  let carousel = null;

  function onCorrectQuestion(event) {
    carousel.goToNext();
  }

  function getRandomNumOfQuestions(numberOfQuestions) {
    let questions = [];

    while (questions.length < numberOfQuestions) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomQuestion = data[randomIndex];

      if (!questions.includes(randomQuestion)) {
        questions.push(randomQuestion);
      }
    }

    return questions;
  }

  onMount(() => {
    if (numberOfQuestions > 0) {
      questions = getRandomNumOfQuestions(numberOfQuestions);
    } else {
      numberOfQuestions = data.length;
      questions = data;
    }
  });

  store.subscribe((value) => {
    updateData();
  });

  
  function updateData() {
    let values = {};

    for (let [key, value] of Object.entries($store.points)) {
      values[key] = (value / $store.maxPoints[key]);
    }

    store.weightedPoints = values;
  }

  function onPageChange(index) {
    console.log("Page changed to " + index);
  }

  let natureDescriptionFinished = false;
</script>

<Carousel
  bind:this="{carousel}"
  infinite="{false}"
  dots="{false}"
  arrows="{false}"
  swiping="{false}"
  on:pageChange="{(event) => onPageChange(event.detail)}">
  {#each questions as question (question.id)}
    <Question
      on:correctQuestion="{onCorrectQuestion}"
      questionData="{data[question.id]}" />
  {/each}

  {#if natureDescriptionFinished}
    <NatureDecriptor bind:finish="{natureDescriptionFinished}" />
  {:else}
    <ResultScreen />
  {/if}

  <!-- <div
    class="flex flex-col-reverse md:flex-row justify-start md:justify-start items-center z-10 bg-slate-900/50 w-screen h-screen overflow-auto">
    <div class="w-full h-fit md:w-[75%] bg-slate-500">
      <RadialChart />
    </div>
    <div
    class="text-box min-w-screen my-2 dynamicMargin dynamicText cursor-default">
    <h1 class="text-white select-none">Hey</h1>
  </div>
    <div
      class="flex flex-row flex-wrap w-full h-full py-4 md:py-16 p-4 cursor-default justify-center items-center bg-slate-300">
      <img src="img/pokemonicons/riolu.png" alt="" class="w-32 h-fit img-box" />
      <img src="img/pokemonicons/riolu.png" alt="" class="w-32 h-fit img-box" />
    </div>
  </div> -->
</Carousel>
