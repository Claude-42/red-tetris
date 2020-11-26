export const PIECE_MOVEMENTS = {
  DOWN: "DOWN",
  DOWN_AUTOMATIC: "DOWN_AUTOMATIC",
  FALL: "FALL",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  ROTATE: "ROTATE",
};

export const CASE_COLOR_MAP = new Map([
  [2, "RED"],
  [3, "BLUE"],
  [4, "TURQUOISE"],
  [5, "ORANGE"],
  [6, "GREEN"],
  [7, "PURPLE"],
  [8, "YELLOW"],

  [9, "BLOCKED"],
  [0, "EMPTY"],
]);

export const CASE_COLOR = {
  RED: "RED",
  BLUE: "BLUE",
  TURQUOISE: "TURQUOISE",
  ORANGE: "ORANGE",
  GREEN: "GREEN",
  PURPLE: "PURPLE",
  YELLOW: "YELLOW",

  BLOCKED: "BLOCKED",
  EMPTY: "EMPTY",
};
