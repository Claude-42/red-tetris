<i18n lang="yaml">
en:
  "game-id": "Game - {id}"
  "start-game": "Start game"
  "leave-game": "Leave game"
  categories:
    playing: "Playing"
    pending: "Waiting"

fr:
  "game-id": "Partie - {id}"
  "start-game": "Lancer le jeu"
  "leave-game": "Quitter le jeu"
  categories:
    playing: "En jeu"
    pending: "En attente"
</i18n>

<template>
  <section class="flex items-center justify-center">
    <div
      class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
    >
      <template v-if="state.matches('waitingToStartLobby')">
        <header class="flex items-center justify-between px-4 py-5">
          <h2 class="text-2xl">
            {{ t("game-id", { id: lobbyName }) }}
          </h2>

          <div class="flex items-center space-x-4">
            <button
              to="/create-game"
              class="px-4 py-2 text-base text-gray-100 bg-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              {{ t("start-game") }}
            </button>

            <button
              to="/create-game"
              class="px-4 py-2 text-base text-white bg-red-500 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              {{ t("leave-game") }}
            </button>
          </div>
        </header>

        <div class="divide-y-2">
          <ul
            v-for="{ category, players } in playersByCategories"
            :key="category"
            class="divide-y divide-opacity-5"
          >
            <h3 class="px-4 py-3 font-bold">
              {{ t(`categories.${category.toLowerCase()}`) }}
            </h3>

            <li
              v-for="{ name: playerName, owner } in players"
              :key="playerName"
              class="flex items-center px-4 py-4"
            >
              <span>{{ playerName }}</span>

              <span v-if="owner" class="ml-2">
                <CrownIcon class="text-yellow-400" />
              </span>
            </li>
          </ul>
        </div>
      </template>

      <div v-else class="flex items-center justify-center py-12">
        <LoaderIcon />
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { useAppMachineContext } from "../composables/app";

import LoaderIcon from "../components/LoaderIcon.vue";
import CrownIcon from "../components/CrownIcon.vue";

const CATEGORIES = {
  PLAYING: "PLAYING",
  PENDING: "PENDING",
};

export default {
  components: {
    LoaderIcon,
    CrownIcon,
  },

  setup() {
    const { t } = useI18n();

    const router = useRouter();
    const route = useRoute();
    const lobbyName = computed(() => route.params.id);

    const { appMachineState, appMachineSend } = useAppMachineContext();

    onMounted(() => {
      appMachineSend({
        type: "JOIN_LOBBY",
        data: lobbyName.value,
      });
    });

    const players = computed(
      () => appMachineState.value.context.lobbyPlayersList ?? []
    );
    const playersByCategories = computed(() => {
      const categories = Object.values(CATEGORIES);

      return categories
        .map((category) => ({
          category,
          players: players.value
            .filter(({ status }) => status === category)
            .map(({ name, owner }) => ({ name, owner })),
        }))
        .filter(({ players }) => players.length > 0);
    });
    const isLobbyFull = computed(
      () => appMachineState.value.context.lobbyStatus === "FULL"
    );

    watch(isLobbyFull, (isLobbyFull) => {
      console.log("is lobby full", isLobbyFull);

      /**
       * If the game is full, redirect the user to /game-full page.
       */
      if (isLobbyFull !== true) {
        return;
      }

      router.replace("/game-full");
    });

    return {
      state: appMachineState,

      t,

      lobbyName,
      playersByCategories,
    };
  },
};
</script>
