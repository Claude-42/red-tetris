<template>
  <section class="flex items-center justify-center">
    <div
      class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
    >
      <header class="flex items-center justify-between px-4 py-5">
        <h2 class="text-2xl">Jeux</h2>

        <router-link
          to="/create-game"
          class="block px-4 py-2 text-base text-gray-100 bg-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          Créer une partie
        </router-link>
      </header>

      <ul class="divide-y divide-opacity-5">
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
    </div>
  </section>
</template>

<script>
import ChevronIcon from "../components/ChevronIcon.vue";

export default {
  components: {
    ChevronIcon,
  },

  setup() {
    const games = ["Marcel 2000", "Super Tetris"];

    return {
      games,
    };
  },
};
</script>
