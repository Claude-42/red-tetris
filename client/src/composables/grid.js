import { ref } from "vue";

import { usePiece } from "./piece.js";
import { BOX_TYPES } from "../constants/box.js";
import { GRID_COLUMNS, GRID_ROWS } from "../constants/grid.js";

const DEFAULT_GRID = Array(GRID_ROWS)
  .fill()
  .map(() =>
    Array(GRID_COLUMNS)
      .fill()
      .map(() => BOX_TYPES.BACKGROUND)
  )
  .flat();

function generateBasicGrid() {
  const arr = [];

  for (let rowIndex = 0; rowIndex < GRID_ROWS; rowIndex++) {
    arr.push(DEFAULT_GRID.slice(rowIndex, rowIndex + GRID_COLUMNS));
  }

  return arr;
}

export function useGrid() {
  const grid = ref(generateBasicGrid());
  const { piece, createPiece, move } = usePiece();

  return {
    grid,
    piece,
    createPiece,
    move
  };
}
