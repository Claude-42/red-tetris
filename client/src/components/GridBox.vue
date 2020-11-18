<template>
  <div :class="[classes, 'w-6 h-6 border']">
    <slot />
  </div>
</template>

<script>
import { computed } from "vue";

import { BOX_TYPES } from "../constants/box.js";

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return Reflect.has(BOX_TYPES, value);
      }
    }
  },

  setup(props) {
    const classes = computed(() => {
      const CLASSES = {
        [BOX_TYPES.BACKGROUND]: "bg-gray-200",
        [BOX_TYPES.BLOCKED]: "bg-gray-600"
      };

      return CLASSES[props.type];
    });

    return {
      classes
    };
  }
};

export { BOX_TYPES };
</script>
