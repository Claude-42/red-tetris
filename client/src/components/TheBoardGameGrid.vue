<template>
  <div class="border border-gray-300">
    <div
      v-for="(columns, rowIndex) in grid"
      :key="`row:${rowIndex}`"
      class="flex"
    >
      <GridBox
        v-for="(boxType, colIndex) in columns"
        :key="`col:${rowIndex}:${colIndex}`"
        :type="boxType"
      />
    </div>
  </div>
</template>

<script>
import { useEvent } from "vue-composable";

import { useGrid } from "../composables/grid.js";
import { PIECE_MOVEMENTS } from "../constants/piece.js";

import GridBox from "./GridBox.vue";

export default {
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

  components: {
    GridBox,
  },
};
</script>
