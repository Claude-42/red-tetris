<i18n lang="yaml">
en:
  game-id: "Game - {id}"
  start-game: "Start game"
  leave-game: "Leave game"
  categories:
    playing: "Playing"
    pending: "Waiting"

fr:
  game-id: "Partie - {id}"
  start-game: "Lancer le jeu"
  leave-game: "Quitter le jeu"
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
            <AppButton v-if="isOwner" @click="startGame">
              {{ t("start-game") }}
            </AppButton>

            <AppButton color="red" @click="leaveGame">
              {{ t("leave-game") }}
            </AppButton>
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
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { useAppMachineContext } from "../composables/app";

import AppButton from "../components/AppButton.vue";
import LoaderIcon from "../components/LoaderIcon.vue";
import CrownIcon from "../components/CrownIcon.vue";
import { useGame } from "../composables/game";

export default {
  components: {
    AppButton,
    LoaderIcon,
    CrownIcon,
  },

  setup() {
    const { t } = useI18n();

    const router = useRouter();
    const route = useRoute();
    const lobbyName = computed(() => route.params.lobbyName);
    const playerName = computed(() => route.params.playerName);

    const { appMachineState, appMachineSend } = useAppMachineContext();
    const {
      playersByCategories,
      isLobbyFull,
      isOwner,
      startGame,
      leaveGame,
    } = useGame();

    watch(
      appMachineState,
      () => {
        // The username is invalid
        if (appMachineState.value.matches("usernameSelection.failure")) {
          // Replace route with Home view
          // to ask a new username.
          router.replace({
            path: "/",
            query: {
              invalid: true,
            },
          });

          return;
        }

        if (appMachineState.value.matches("usernameSelection.idle")) {
          appMachineSend({
            type: "SET_USERNAME_BYPASS_LOBBIES",
            data: playerName.value,
          });

          return;
        }

        if (appMachineState.value.matches("choosingLobby")) {
          appMachineSend({
            type: "SELECT_LOBBY",
            data: lobbyName.value,
          });

          return;
        }

        if (appMachineState.value.matches("waitingToJoinLobby")) {
          appMachineSend("JOIN_LOBBY");

          return;
        }

        if (appMachineState.value.matches("readyToPlay")) {
          router.push("/board-game");

          return;
        }
      },
      {
        immediate: true,
      }
    );

    watch(isLobbyFull, (isLobbyFull) => {
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
      playerName,
      playersByCategories,
      isOwner,

      startGame,
      leaveGame,
    };
  },
};
</script>
