import { Machine, assign, sendParent } from "xstate";

const GO_DOWN_TIME = 1000;
const DEBOUNCE_TIME = 200;

export const pieceMachine = Machine(
  {
    id: "piece",
    context: {
      type: undefined,
      coordinates: {
        x: undefined,
        y: undefined
      },
      simulatedCoordinates: {
        x: undefined,
        y: undefined
      }
    },
    initial: "moving",
    states: {
      moving: {
        type: "parallel",
        states: {
          listener: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  "MOVE.UP": {
                    target: "debounce",
                    actions: ["moveUp", "requestConfirmation"]
                  },
                  "MOVE.DOWN": {
                    target: "debounce",
                    actions: ["moveDown", "requestConfirmation"]
                  },
                  "MOVE.LEFT": {
                    target: "debounce",
                    actions: ["moveLeft", "requestConfirmation"]
                  },
                  "MOVE.RIGHT": {
                    target: "debounce",
                    actions: ["moveRight", "requestConfirmation"]
                  },
                  "MOVE.FALL": {
                    target: "debounce",
                    actions: ["moveFall", "requestConfirmation"]
                  }
                }
              },
              debounce: {
                after: {
                  [DEBOUNCE_TIME]: "idle"
                }
              }
            }
          },
          timer: {
            initial: "idle",
            states: {
              idle: {
                after: {
                  [GO_DOWN_TIME]: "inc"
                }
              },
              inc: {
                entry: ["moveDown", "syncMovement"],
                on: {
                  "": "idle"
                }
              }
            }
          }
        },
        on: {
          "MOVE.CONFIRMED": {
            actions: "confirmMovement"
          }
        }
      },
      stopped: {
        entry: sendParent("PIECE.END")
      }
    }
  },
  {
    actions: {
      moveUp: assign({
        coordinates: {
          y: ({ y }) => y - 1
        }
      }),
      moveDown: assign({
        coordinates: {
          y: ({ y }) => y + 1
        }
      }),
      moveLeft: assign({
        coordinates: {
          x: ({ x }) => x - 1
        }
      }),
      moveRight: assign({
        coordinates: {
          x: ({ x }) => x + 1
        }
      }),
      moveFall: assign({
        coordinates: {
          y: () => 16
        }
      }),
      requestConfirmation: sendParent(context => ({
        ...context,
        type: "MOVE.CONFIRM"
      })),
      syncMovement: sendParent(context => ({
        ...context,
        type: "MOVE.SYNC"
      })),
      confirmMovement: assign({
        coordinates: ({ simulatedCoordinates }) => simulatedCoordinates,
        simulatedCoordinates: () => ({
          x: undefined,
          y: undefined
        })
      })
    }
  }
);
