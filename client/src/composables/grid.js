import { computed } from "vue";

import { useAppMachineContext } from "../composables/app.js";
import { PIECE_MOVEMENTS } from "../constants/piece.js";

export function useGrid() {
  const { appMachineState, appMachineSend } = useAppMachineContext();

  const grid = computed(() => appMachineState.value.context.grid);
  const nextPiece = computed(() => appMachineState.value.context.nextPiece);

  function move(movement) {
    if (!Reflect.has(PIECE_MOVEMENTS, movement)) {
      throw new Error("invalid movement");
    }

    appMachineSend(`MOVE.${movement}`);
  }

  function startGame() {
    appMachineSend("START_GAME");
  }

  return {
    grid,
    nextPiece,

    move,
    startGame,
  };
}
