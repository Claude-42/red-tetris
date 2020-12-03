<template>
  <span class="relative">
    <Menu>
      <MenuButton
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
      >
        <slot name="button-inner" />

        <ChevronIcon down class="w-5 h-5 ml-2 -mr-1 text-gray-500" />
      </MenuButton>

      <transition
        enter-active-class="transition duration-200 ease-out transform"
        leave-active-class="transition duration-75 ease-in transform"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <slot />
        </MenuItems>
      </transition>
    </Menu>
  </span>
</template>

<script>
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";

import ChevronIcon from "./ChevronIcon.vue";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    ChevronIcon,
  },
};
</script>
