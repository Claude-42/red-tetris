import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAppMachineContext } from "./app.js";

const CATEGORIES = {
  PLAYING: "PLAYING",
  PENDING: "PENDING",
};

export function useGame() {
  const router = useRouter();
  const route = useRoute();
  const { appMachineState, appMachineSend } = useAppMachineContext();

  const games = computed(
    () => appMachineState.value.context.availableLobbies ?? []
  );

  const lobbyName = computed(() => appMachineState.value.context.lobbyName);
  const playerName = computed(() => appMachineState.value.context.username);
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
  const isOwner = computed(() => appMachineState.value.context.isOwner);

  function formatGamePath(lobbyName) {
    return `${encodeURIComponent(lobbyName)}[${encodeURIComponent(
      playerName.value
    )}]`;
  }

  function startGame() {
    if (isOwner.value !== true) {
      return;
    }

    appMachineSend("START_GAME");
  }

  function leaveGame() {
    appMachineSend("QUIT_LOBBY");
  }

  function redirectToWaitingRoom() {
    const waitingRoomPath = formatGamePath(lobbyName.value);

    router.push(waitingRoomPath);
  }

  watchEffect(() => {
    const GAMES_LIST_PATH = "/games";

    if (route.path === GAMES_LIST_PATH) {
      return;
    }

    if (appMachineState.value.matches("loadingLobbies")) {
      router.push(GAMES_LIST_PATH);
    }
  });

  return {
    games,

    lobbyName,
    playerName,
    playersByCategories,
    isLobbyFull,
    isOwner,

    formatGamePath,

    startGame,
    leaveGame,

    redirectToWaitingRoom,
  };
}
