<i18n lang="yaml">
en:
  title: "Create a game"
  input-placeholder: "Fill game name"
  submit-label: "Create the game"

fr:
  title: "Création d'une partie"
  input-placeholder: "Saisir le nom de la partie"
  submit-label: "Créer la partie"
</i18n>

<template>
  <section class="flex items-center justify-center">
    <form
      class="flex flex-col items-center justify-center w-full max-w-md p-8 mx-2 mt-8 space-y-10 bg-white border shadow rounded-xl"
      @submit.prevent="createGame"
    >
      <h2 class="text-3xl font-bold text-center">
        {{ t("title") }}
      </h2>

      <div class="relative w-full mt-1 rounded-md shadow-sm">
        <input
          type="text"
          id="lobby-name"
          name="lobby-name"
          class="block w-full border-gray-300 rounded-md focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
          :placeholder="t('input-placeholder')"
        />
      </div>

      <div class="flex justify-end w-full">
        <AppButton type="submit" rounded :aria-label="t('submit-label')">
          <ChevronIcon right />
        </AppButton>
      </div>
    </form>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { useGame } from "../composables/game.js";

import AppButton from "../components/AppButton.vue";
import ChevronIcon from "../components/ChevronIcon.vue";

export default {
  components: {
    AppButton,
    ChevronIcon,
  },

  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const { formatGamePath } = useGame();

    function createGame({ target: form }) {
      const data = new FormData(form);
      const lobbyName = data.get("lobby-name").toString().trim();
      if (lobbyName === "") {
        return;
      }

      router.push(formatGamePath(lobbyName));
    }

    return {
      t,

      createGame,
    };
  },
};
</script>
