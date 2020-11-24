<template>
  <div>
    <TheBoardGameGrid :grid="grid" />

    <TheBoardGameNextPieceGrid :next-piece="nextPiece" />

    <button @click="startGame">Start game</button>
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
