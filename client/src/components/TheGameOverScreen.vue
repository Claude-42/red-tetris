<i18n lang="yaml">
en:
  title: "Game Over"

fr:
  title: "Game Over"
</i18n>

<template>
  <div class="absolute inset-0">
    <div
      class="flex items-center justify-center w-full h-full text-2xl text-center text-white bg-gray-900 opacity-80"
    >
      <p class="animate-pulse">
        {{ t("title") }}
      </p>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
};
</script>
