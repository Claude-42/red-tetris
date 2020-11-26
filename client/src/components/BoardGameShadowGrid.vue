<template>
  <BoardGameGrid :grid="grid" />
</template>

<script>
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
};
</script>
