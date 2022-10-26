<script>
  import data from "../assets/dataEs.json";
  import Question from "./Question.svelte";

  let currentQuestion = 0;
</script>

<!-- {#each questions as question (question.id)} -->
<Question questionData={data[currentQuestion]} />
<!-- {/each} -->
