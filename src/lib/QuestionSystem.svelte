<script>
  import { onMount } from "svelte";
  import data from "../assets/dataEs.json";
  import Question from "./Question.svelte";
</script>

<!-- {#each questions as question (question.id)} -->
<Question questionData="{data[0]}" />
<!-- {/each} -->
