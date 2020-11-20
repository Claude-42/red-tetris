<template>
  <div>
    <TheBoardGameGrid :grid="grid" />

    <button @click="startGame">
      Start game
    </button>
  </div>
</template>

<script>
import TheBoardGameGrid from "./TheBoardGameGrid.vue";

import { useGrid } from "../composables/grid.js";

export default {
  components: {
    TheBoardGameGrid
  },

  setup() {
    const { grid, startGame } = useGrid();

    return {
      grid,
      startGame
    };
  }
};
</script>
