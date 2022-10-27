<script>
  import Carousel from "svelte-carousel";
  import Question from "./Question.svelte";
  import { store } from "../assets/store.js";
  import RadialChart from "./RadialChart.svelte";
  import * as utils from "../assets/utils.js";
  import { onMount } from "svelte";

  let data = utils.getQuestionData();
  let numberOfQuestions = $store.numQuestions;
  let questions = [];

  let carousel = null;
  let carouselIndex = 0;
  let pagesCount = 0;

  function onCorrectQuestion(event) {
    carousel.goToNext();
    carouselIndex++;

    console.log("Index: " + carouselIndex + " Pages: " + pagesCount);
    if (carouselIndex === (pagesCount - 1)) {
      radial.createChart();
    }
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

    pagesCount = numberOfQuestions + 1;
  });
  let radial = null;
</script>

<Carousel
  bind:this="{carousel}"
  infinite="{false}"
  dots="{false}"
  arrows="{false}"
  swiping="{false}">
  {#each questions as question (question.id)}
    <Question
      on:correctQuestion="{onCorrectQuestion}"
      questionData="{data[question.id]}" />
  {/each}

  <div class="flex flex-col-reverse justify-start md:flex-col md:justify-end">
    <div class="flex flex-col justify-center items-center md:items-start">
      <RadialChart bind:this="{radial}" />
    </div>
    <div
      class="text-box min-w-screen my-2 dynamicMargin dynamicText cursor-default">
      <h1 class="text-white select-none">Esto es una prueba</h1>
    </div>
  </div>
</Carousel>
