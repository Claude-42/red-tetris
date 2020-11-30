<i18n lang="yaml">
en:
  games: "All games"
  create-a-game: "Create a game"
  no-games: "There is no game. Create one!"

fr:
  games: "Toutes les parties"
  create-a-game: "Créer une partie"
  no-games: "Il n'y a aucune partie. Créez-en une !"
</i18n>

<template>
  <section class="flex items-center justify-center">
    <div
      class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
    >
      <header class="flex items-center justify-between px-4 py-5">
        <h2 class="text-2xl">
          {{ t("games") }}
        </h2>

        <AppButton to="/create-game">
          {{ t("create-a-game") }}
        </AppButton>
      </header>

      <ul v-if="games.length > 0" class="divide-y divide-opacity-5">
        <li v-for="game in games" :key="game">
          <router-link
            :to="formatGamePath(game)"
            class="flex items-center justify-between px-4 py-4 focus:outline-none focus:ring-2 ring-inset focus:ring-blue-400"
          >
            <span>{{ game }}</span>

            <ChevronIcon right class="w-6 h-6 text-gray-500" />
          </router-link>
        </li>
      </ul>

      <p
        v-else
        class="flex items-center justify-center py-6 text-center text-gray-500"
      >
        {{ t("no-games") }}
      </p>
    </div>
  </section>
</template>

<script>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

import { useGame } from "../composables/game.js";

import AppButton from "../components/AppButton.vue";
import ChevronIcon from "../components/ChevronIcon.vue";
import { useAppMachineContext } from "../composables/app.js";

export default {
  components: {
    AppButton,
    ChevronIcon,
  },

  setup() {
    const { t } = useI18n();

    const { appMachineState, appMachineSend } = useAppMachineContext();

    const { games, formatGamePath } = useGame();

    onMounted(() => {
      appMachineSend("LOAD_LOBBIES");
    });

    return {
      appMachineState,

      t,

      games,
      formatGamePath,
    };
  },
};
</script>
