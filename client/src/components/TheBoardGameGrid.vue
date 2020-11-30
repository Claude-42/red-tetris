<template>
  <div class="relative flex items-center justify-center">
    <transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <TheGameOverScreen v-show="isGameOver" class="origin-center" />
    </transition>

    <BoardGameGrid :grid="grid" />
  </div>
</template>

<script>
import { watch } from "vue";
import { useEvent } from "vue-composable";

import { useGrid } from "../composables/grid.js";
import { PIECE_MOVEMENTS } from "../constants/piece.js";

import BoardGameGrid from "./BoardGameGrid.vue";
import TheGameOverScreen from "./TheGameOverScreen.vue";

export default {
  components: {
    BoardGameGrid,
    TheGameOverScreen,
  },

  props: {
    grid: {
      type: Array,
      required: true,
    },

    isGameOver: Boolean,
  },

  setup(props) {
    const { move } = useGrid();

    const remove = useEvent(window, "keydown", (event) => {
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

    // Unwatch keydown events when the game is lost.
    // Actually this is a useless optimization but it's great
    // to know we can do that.
    watch(
      () => props.isGameOver,
      (isGameOver) => {
        if (isGameOver) {
          remove();
        }
      }
    );
  },
};
</script>
