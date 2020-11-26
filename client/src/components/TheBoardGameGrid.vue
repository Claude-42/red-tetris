<template>
  <div class="flex items-center justify-center">
    <BoardGameGrid :grid="grid" />
  </div>
</template>

<script>
import { useEvent } from "vue-composable";

import { useGrid } from "../composables/grid.js";
import { PIECE_MOVEMENTS } from "../constants/piece.js";

import BoardGameGrid from "./BoardGameGrid.vue";

export default {
  components: {
    BoardGameGrid,
  },

  props: {
    grid: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const { move } = useGrid();

    useEvent(window, "keydown", (event) => {
      const keyToMoveMap = new Map([
        ["ArrowDown", PIECE_MOVEMENTS.DOWN],
        [" ", PIECE_MOVEMENTS.FALL],
        ["ArrowLeft", PIECE_MOVEMENTS.LEFT],
        ["ArrowRight", PIECE_MOVEMENTS.RIGHT],
        ["ArrowUp", PIECE_MOVEMENTS.ROTATE],
      ]);

      const movement = keyToMoveMap.get(event.key);
      if (movement === undefined) {
        return;
      }

      move(movement);
    });
  },
};
</script>
