<i18n lang="yaml">
en:
  title: "The game is full"

fr:
  title: "La partie ne peut pas recevoir d'autres joueurs"
</i18n>

<template>
  <section class="flex items-center justify-center">
    <div
      class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
    >
      <p
        class="flex items-center justify-center py-6 text-center text-gray-500"
      >
        {{ t("title") }}
      </p>
    </div>
  </section>
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
