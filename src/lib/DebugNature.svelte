<script>
  // Import store
  import { store } from "../assets/store.js";
</script>

<div class="absolute top-0 min-w-screen m-4 h-20 bg-slate-600">
  <!-- Create table displaying value of each nature. Table has 4 columns: Nature, Value, Nature, Value -->

  <!-- Create table row for each nature -->
  {#each Object.entries($store.points) as [nature, value]}
    <!-- Create table cell for nature -->
    <div class="inline-block w-[8%] h-10">
      <h1 class="text-white text-sm bg-slate-800">{nature}</h1>
      <h1 class="text-white text-sm bg-slate-800">{value}</h1>
    </div>
  {/each}
</div>
