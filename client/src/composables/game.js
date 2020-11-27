import { computed } from "vue";

import { useAppMachineContext } from "./app.js";

export function useGame() {
  const { appMachineState } = useAppMachineContext();

  const games = computed(
    () => appMachineState.value.context.availableLobbies ?? []
  );
  const playerName = computed(() => appMachineState.value.context.username);

  function formatGamePath(lobbyName) {
    return `${encodeURIComponent(lobbyName)}[${encodeURIComponent(
      playerName.value
    )}]`;
  }

  return {
    games,
    playerName,
    formatGamePath,
  };
}
