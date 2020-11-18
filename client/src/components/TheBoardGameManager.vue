<template>
  <div>
    <TheBoardGameGrid :grid="grid" />

    <pre>
      {{ state }}
    </pre>
  </div>
</template>

<script>
import TheBoardGameGrid from "./TheBoardGameGrid.vue";

import { useMachine } from "../composables/machine";
import { useGrid } from "../composables/grid.js";
import { gameMachine } from "../machines/game.js";

export default {
  components: {
    TheBoardGameGrid
  },

  setup() {
    const { grid, createPiece } = useGrid();

    const { state, send } = useMachine(gameMachine);

    createPiece();

    return {
      grid,
      state,
      send
    };
  }
};
</script>
