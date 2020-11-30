<i18n lang="yaml">
en:
  no-other-players: "There is no other player"

fr:
  no-other-players: "Vous êtes le seul joueur"
</i18n>

<template>
  <div class="w-full">
    <div v-if="players?.length > 0" class="flex flex-wrap">
      <BoardGameShadowContainer
        v-for="{ name: playerName, grid } in players"
        :key="playerName"
        :player-name="playerName"
        :grid="grid"
        class="p-1"
      />
    </div>

    <p v-else class="text-sm text-center text-gray-600">
      {{ t("no-other-players") }}
    </p>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

import BoardGameShadowContainer from "./BoardGameShadowContainer.vue";

export default {
  components: {
    BoardGameShadowContainer,
  },

  props: {
    players: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
};
</script>
