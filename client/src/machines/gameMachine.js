import { assign, Machine, spawn } from "xstate";
import { choose, forwardTo, respond } from "xstate/lib/actions";

import { GRID_COLUMNS, GRID_ROWS } from "../constants/grid.js";
import { BOX_TYPES } from "../constants/box.js";
import { loadingMachine } from "./loadingMachine.js";
import { pieceMachine } from "./pieceMachine.js";

const DEFAULT_GRID = Array(GRID_ROWS)
  .fill()
  .map(() =>
    Array(GRID_COLUMNS)
      .fill()
      .map(() => BOX_TYPES.BACKGROUND)
  );

export const gameMachine = Machine(
  {
    id: "game",
    initial: "loading",
    context: {
      definitiveGrid: DEFAULT_GRID,
      printingGrid: DEFAULT_GRID,
      piece: undefined,

      newPieceContext: {
        type: "RED",
        coordinates: {
          x: 0,
          y: 0
        }
      },

      confirmedMovement: false
    },
    states: {
      loading: {
        invoke: {
          src: loadingMachine,
          onDone: "play"
        }
      },
      play: {
        initial: "initialize",
        states: {
          initialize: {
            entry: ["spawnPiece"]
          },
          play: {},
          end: {
            type: "final"
          }
        },
        on: {
          "PIECE.END": {
            actions: "spawnPiece"
          },
          "MOVE.CONFIRM": {
            actions: choose([
              {
                actions: "confirmPiece"
              },
              {
                cond: "confirmedMovement",
                actions: [
                  respond("MOVE.CONFIRMED", {
                    to: ({ piece }) => piece
                  }),
                  "applyMovementToPrintingGrid",
                  "resetPieceMovementConfirmation"
                ]
              }
            ])
          },
          "MOVE.SYNC": {
            actions: "applyMovementToPrintingGrid"
          },
          "MOVE.UP": {
            actions: "forwardToPieceService"
          },
          "MOVE.LEFT": {
            actions: "forwardToPieceService"
          },
          "MOVE.RIGHT": {
            actions: "forwardToPieceService"
          },
          "MOVE.DOWN": {
            actions: "forwardToPieceService"
          },
          "MOVE.FALL": {
            actions: "forwardToPieceService"
          }
        }
      }
    }
  },
  {
    actions: {
      spawnPiece: assign({
        piece: ctx =>
          spawn(pieceMachine.withContext(ctx.newPieceContext), { sync: true })
      }),
      confirmPiece: assign({
        confirmedMovement: (ctx, event) => {
          console.log("confirmed movement assign", ctx, event);

          return true;
        }
      }),
      applyMovementToPrintingGrid: assign({
        printingGrid: ({ printingGrid }, event) => {
          console.log("apply movement to printing grid", printingGrid, event);

          return printingGrid;
        }
      }),
      resetPieceMovementConfirmation: assign({
        confirmedMovement: false
      }),
      forwardToPieceService: forwardTo(({ piece }) => piece)
    },
    guards: {
      confirmedMovement: ctx => ctx.confirmedMovement === true
    }
  }
);
