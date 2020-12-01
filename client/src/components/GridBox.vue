<template>
  <div :class="[colorClasses, sizeClasses, 'border border-gray-300']" />
</template>

<script>
import { computed } from "vue";

import { CASE_COLOR_MAP, CASE_COLOR } from "../constants/piece.js";

export default {
  props: {
    type: {
      type: Number,
      required: true,
      validator(value) {
        return CASE_COLOR_MAP.has(value);
      },
    },

    small: Boolean,
  },

  setup(props) {
    const color = computed(() => CASE_COLOR_MAP.get(props.type));

    const colorClasses = computed(() => {
      const CLASSES = new Map([
        [CASE_COLOR.RED, "bg-red-400"],
        [CASE_COLOR.BLUE, "bg-blue-700"],
        [CASE_COLOR.TURQUOISE, "bg-blue-300"],
        [CASE_COLOR.ORANGE, "bg-yellow-500"],
        [CASE_COLOR.GREEN, "bg-green-500"],
        [CASE_COLOR.PURPLE, "bg-purple-600"],
        [CASE_COLOR.YELLOW, "bg-yellow-300"],

        [CASE_COLOR.BLOCKED, "bg-gray-600"],
      ]);

      return CLASSES.get(color.value);
    });

    const sizeClasses = computed(() => {
      if (props.small) {
        return "w-2 h-2";
      }

      return "w-6 h-6";
    });

    return {
      colorClasses,
      sizeClasses,
    };
  },
};
</script>
