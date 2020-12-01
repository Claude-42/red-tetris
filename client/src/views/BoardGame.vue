<template>
  <section class="flex items-center justify-center">
    <TheBoardGameManager v-if="isPlaying" />

    <div
      v-else
      class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
    >
      <div class="flex items-center justify-center py-12">
        <LoaderIcon />
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, watch } from "vue";

import TheBoardGameManager from "../components/TheBoardGameManager.vue";
import LoaderIcon from "../components/LoaderIcon.vue";
import { useAppMachineContext } from "../composables/app";
import { useGame } from "../composables/game";

export default {
  components: {
    TheBoardGameManager,
    LoaderIcon,
  },

  setup() {
    const { redirectToWaitingRoom } = useGame();

    const { appMachineState, appMachineSend } = useAppMachineContext();

    onMounted(() => {
      appMachineSend("START_GAME");
    });

    const isPlaying = computed(() => appMachineState.value.matches("playing"));

    watch(appMachineState, (appMachineState) => {
      // The game is ended, redirect the user to the waiting room
      if (appMachineState.matches("waitingToStartLobby")) {
        redirectToWaitingRoom();
      }
    });

    return {
      isPlaying,
    };
  },
};
</script>
