<template>
  <TheHeader />

  <router-view />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

import { useProvideAppMachine } from "./composables/app.js";

export default {
  components: {
    TheHeader
  },

  setup() {
    useProvideAppMachine();
  }
};
</script>
