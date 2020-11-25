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

        <router-link
          to="/create-game"
          class="block px-4 py-2 text-base text-gray-100 bg-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          {{ t("create-a-game") }}
        </router-link>
      </header>

      <ul v-if="games.length > 0" class="divide-y divide-opacity-5">
        <li v-for="game in games" :key="game">
          <router-link
            :to="`/game/${encodeURIComponent(game)}`"
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import ChevronIcon from "../components/ChevronIcon.vue";
import { useAppMachineContext } from "../composables/app";

export default {
  components: {
    ChevronIcon,
  },

  setup() {
    const { t } = useI18n();

    const { appMachineState } = useAppMachineContext();

    const games = computed(
      () => appMachineState.value.context.availableLobbies ?? []
    );

    return {
      t,

      games,
    };
  },
};
</script>
