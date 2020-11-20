import { computed } from "vue";

import { useAppMachine } from "../composables/app.js";
import { PIECE_MOVEMENTS } from "../constants/piece.js";

export function useGrid() {
  const { appMachineState, appMachineSend } = useAppMachine();

  const grid = computed(() => appMachineState.value.context.grid);

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

    move,
    startGame
  };
}
