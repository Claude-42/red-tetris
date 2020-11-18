<template>
  <div @click="send('MOVE.DOWN')">
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
import { gameMachine } from "../machines/gameMachine.js";

export default {
  components: {
    TheBoardGameGrid
  },

  setup() {
    const { grid } = useGrid();

    const { state, send } = useMachine(gameMachine);

    return {
      grid,
      state,
      send
    };
  }
};
</script>
