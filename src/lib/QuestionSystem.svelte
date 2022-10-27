<script>
  import data from "../assets/dataEs.json";
  import Question from "./Question.svelte";

  let currentQuestion = 0;
</script>

<!-- {#each data as question (question.id)} -->
<Question questionData="{data[0]}" />
<!-- {/each} -->
