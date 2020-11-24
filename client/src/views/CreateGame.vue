<template>
  <section class="flex items-center justify-center">
    <form
      class="flex flex-col items-center justify-center p-8 mx-2 mt-8 space-y-10 bg-white border shadow rounded-xl"
      @submit.prevent="createGame"
    >
      <h2 class="text-3xl font-bold text-center">Création d'une partie</h2>

      <div class="relative w-full mt-1 rounded-md shadow-sm">
        <input
          type="text"
          id="lobby-name"
          name="lobby-name"
          class="block w-full border-gray-300 rounded-md focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
          placeholder="Saisir le nom de la partie"
        />
      </div>

      <div class="flex justify-end w-full">
        <button
          type="submit"
          class="p-2 text-gray-100 bg-blue-300 rounded-full shadow focus:ring focus:ring-blue-400 focus:border-blue-400 focus:ring-opacity-50"
        >
          <ChevronIcon right />
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { useRouter } from "vue-router";

import ChevronIcon from "../components/ChevronIcon.vue";

export default {
  components: {
    ChevronIcon,
  },

  setup() {
    const router = useRouter();

    function createGame({ target: form }) {
      const data = new FormData(form);
      const lobbyName = data.get("lobby-name").toString().trim();
      if (lobbyName === "") {
        return;
      }

      console.log("lobbyName", lobbyName);

      router.push(`/game/${encodeURI(lobbyName)}`);
    }

    return {
      createGame,
    };
  },
};
</script>
