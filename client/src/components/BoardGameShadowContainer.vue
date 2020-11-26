<template>
  <article class="flex flex-col space-y-1">
    <h4 class="text-sm font-semibold text-gray-800 truncate">
      {{ playerName }}
    </h4>

    <BoardGameShadowGrid :grid="grid" />
  </article>
</template>

<script>
import BoardGameShadowGrid from "./BoardGameShadowGrid.vue";

export default {
  components: {
    BoardGameShadowGrid,
  },

  props: {
    playerName: {
      type: String,
      required: true,
    },

    grid: {
      type: Array,
      required: true,
    },
  },
};
</script>
