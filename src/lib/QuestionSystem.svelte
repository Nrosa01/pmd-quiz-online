<script>
  import Carousel from "svelte-carousel";
  import Question from "./Question.svelte";
  import { store, initStore } from "../assets/store.js";
  import { fade } from "svelte/transition";

  import * as utils from "../assets/utils.js";
  import { onMount } from "svelte";
  import NatureDecriptor from "./NatureDecriptor.svelte";
  import ResultScreen from "./ResultScreen.svelte";

  let data = $store.questions;
  let numberOfQuestions = $store.numQuestions;
  let questions = [];
  let index = 0;
  export let dataExt = null;

  let carousel = null;

  function onCorrectQuestion(event) {
    carousel.goToNext();
    index++;

    if (index === numberOfQuestions) {
      console.log("Finished");
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
    // initStore(dataExt);
    $store.natures = dataExt.natures;
    $store.questions = dataExt.questions;
    $store.natureToPokemon = dataExt.natureToPokemon;
    $store.natureDescription = dataExt.natureDescription;
    $store.strings = dataExt.strings;

    const point = dataExt.natures.reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {});

    $store.points = point;
    $store.maxPoints = utils.getMaxPoints(point, $store.questions);

    data = $store.questions;
    numberOfQuestions = $store.numQuestions;
    console.table($store)

    if (numberOfQuestions > 0) {
      questions = getRandomNumOfQuestions(numberOfQuestions);
    } else {
      numberOfQuestions = data.length;
      questions = data;
    }

    store.subscribe((value) => {
      updateData();
    });
  });

  function updateData() {
    let values = {};

    for (let [key, value] of Object.entries($store.points)) {
      values[key] = value / $store.maxPoints[key];
    }

    store.weightedPoints = values;
  }

  function onPageChange(event) {}

  let natureDescriptionFinished = false;
  let natureDecriptor = null;
</script>

{#if index !== numberOfQuestions}
  <Carousel
    bind:this="{carousel}"
    infinite="{false}"
    dots="{false}"
    arrows="{false}"
    swiping="{false}"
    on:pageChange="{(event) => onPageChange(event)}">
    {#each questions as question (question.id)}
      <Question
        on:correctQuestion="{onCorrectQuestion}"
        questionData="{data[question.id]}" />
    {/each}
  </Carousel>
{:else if !natureDescriptionFinished}
  <NatureDecriptor
    bind:this="{natureDecriptor}"
    bind:finish="{natureDescriptionFinished}" />
{:else}
  <ResultScreen />
{/if}
