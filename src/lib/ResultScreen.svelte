<script>
import RadialChart from "./RadialChart.svelte";
import { store } from "../assets/store.js";

$: strings = $store.strings;

</script>

<section>
    <!-- Using Tailwind CSS, build a grid that divides screen in half. The right grid is vertically divied in other two sections -->
    <div class="grid grid-cols-2 h-screen w-screen">
        <!-- Left grid -->
        <div class="bg-black/50 flex flex-col justify-center items-center">
            <RadialChart class="w-[75%]"/>
        </div>
        <!-- Right grid -->
        <div class="bg-black/50 flex flex-col justify-center items-center">
            <h1 class="text-white text-box select-none p-0 mb-4 w-[90%]">{strings["ResultMessage"]}</h1>
            <!-- Row of images -->

            <div class="flex flex-row flex-wrap justify-center items-center w-[90%] gap-4">
                <img src="img/pokemonicons/riolu.png" alt ="" class="w-[25%] rendering-pixelated img-box"/>
                <img src="img/pokemonicons/riolu.png" alt ="" class="w-[25%] rendering-pixelated img-box"/>
                <img src="img/pokemonicons/riolu.png" alt ="" class="w-[25%] rendering-pixelated img-box"/>
                <img src="img/pokemonicons/riolu.png" alt ="" class="w-[25%] rendering-pixelated img-box"/>
                <img src="img/pokemonicons/riolu.png" alt ="" class="w-[25%] rendering-pixelated img-box"/>
                <img src="img/pokemonicons/riolu.png" alt ="" class="w-[25%] rendering-pixelated img-box"/>
            </div>
        </div>
</section>