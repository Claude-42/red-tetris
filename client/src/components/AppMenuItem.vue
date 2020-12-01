<template>
  <MenuItem :disabled="disabled" v-slot="{ active }">
    <button
      :class="[
        disabled
          ? 'text-gray-300 cursor-default'
          : active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-700',
        'inline-flex w-full px-4 py-2 text-sm transition-colors duration-75',
      ]"
      :disabled="disabled"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </MenuItem>
</template>

<script>
import { MenuItem } from "@headlessui/vue";

export default {
  components: {
    MenuItem,
  },

  props: {
    disabled: Boolean,
  },
};
</script>
