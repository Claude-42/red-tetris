<template>
  <div
    class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
  >
    <header class="flex items-center justify-center px-4 py-5">
      <h2 class="text-2xl font-bold text-center">Claude bastard game</h2>
    </header>

    <div class="flex">
      <TheBoardGameGrid :grid="grid" class="w-3/5" />

      <div class="w-2/5">
        <TheBoardGameNextPieceGrid :next-piece="nextPiece" />

        <button @click="startGame">Start game</button>
      </div>
    </div>
  </div>
</template>

<script>
import TheBoardGameGrid from "./TheBoardGameGrid.vue";
import TheBoardGameNextPieceGrid from "./TheBoardGameNextPieceGrid.vue";

import { useGrid } from "../composables/grid.js";

export default {
  components: {
    TheBoardGameGrid,
    TheBoardGameNextPieceGrid,
  },

  setup() {
    const { grid, nextPiece, startGame } = useGrid();

    return {
      grid,
      nextPiece,
      startGame,
    };
  },
};
</script>
