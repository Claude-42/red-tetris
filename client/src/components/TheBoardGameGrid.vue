<template>
  <div>
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
import GridBox from "./GridBox.vue";

export default {
  props: {
    grid: {
      type: Array,
      required: true
    }
  },

  components: {
    GridBox
  }
};
</script>
