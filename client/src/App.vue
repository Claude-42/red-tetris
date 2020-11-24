<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <TheHeader />

    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

import { useAppMachineProvider } from "./composables/app.js";
import { useDefaultBrowserLanguage } from "./composables/language.js";

export default {
  components: {
    TheHeader,
  },

  setup() {
    useAppMachineProvider();

    useDefaultBrowserLanguage();
  },
};
</script>
