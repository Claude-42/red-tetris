import { computed } from "vue";

import { useAppMachineContext } from "../composables/app.js";
import { PIECE_MOVEMENTS } from "../constants/piece.js";

export function useGrid() {
  const { appMachineState, appMachineSend } = useAppMachineContext();

  const lobbyName = computed(() => appMachineState.value.context.lobbyName);
  const grid = computed(() => appMachineState.value.context.grid);
  const nextPiece = computed(() => appMachineState.value.context.nextPiece);
  const playersShadows = computed(
    () => appMachineState.value.context.lobbyPlayersShadows
  );
  const score = computed(() => appMachineState.value.context.score);

  const isGameOver = computed(
    () =>
      appMachineState.value.matches("playing.gameOver") ||
      appMachineState.value.matches("playing.waitingToExitRoom")
  );

  function move(movement) {
    if (!Reflect.has(PIECE_MOVEMENTS, movement)) {
      throw new Error("invalid movement");
    }

    appMachineSend(`MOVE.${movement}`);
  }

  return {
    state: appMachineState,

    lobbyName,
    grid,
    nextPiece,
    playersShadows,
    score,
    isGameOver,

    move,
  };
}
