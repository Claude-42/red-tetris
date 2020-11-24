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
            v-for="playerName in players"
            :key="playerName"
            class="flex items-center justify-between px-4 py-4"
          >
            <span>{{ playerName }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const CATEGORIES = {
  PLAYING: "PLAYING",
  PENDING: "PENDING",
};

export default {
  setup() {
    const { t } = useI18n();

    const route = useRoute();
    const lobbyName = computed(() => route.params.id);

    const players = [
      {
        name: "Gégé",
        status: "PLAYING",
      },
      {
        name: "Lol 2000",
        status: "PLAYING",
      },
      {
        name: "Francis 8=D",
        status: "PENDING",
      },
      {
        name: "Moi",
        status: "PENDING",
      },
    ];

    const playersByCategories = computed(() => {
      const categories = Object.values(CATEGORIES);

      return categories
        .map((category) => ({
          category,
          players: players
            .filter(({ status }) => status === category)
            .map(({ name }) => name),
        }))
        .filter(({ players }) => players.length > 0);
    });

    return {
      t,

      lobbyName,
      playersByCategories,
    };
  },
};
</script>
