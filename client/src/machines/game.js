import { assign, Machine } from "xstate";

const GO_DOWN_TIME = 1000;
const DEBOUNCE_TIME = 200;

const loadingMachine = Machine({
  id: "loading",
  initial: "one",
  states: {
    one: {
      after: {
        1000: "two"
      }
    },
    two: {
      after: {
        1000: "three"
      }
    },
    three: {
      after: {
        1000: "go"
      }
    },
    go: {
      type: "final"
    }
  }
});

export const gameMachine = Machine(
  {
    id: "game",
    initial: "loading",
    context: {
      x: 0,
      y: 0
    },
    states: {
      loading: {
        invoke: {
          src: loadingMachine,
          onDone: "play"
        }
      },
      play: {
        type: "parallel",
        states: {
          game: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  DOWN: "down",
                  LEFT: "left",
                  RIGHT: "right",
                  FALL: "fall"
                }
              },
              down: {
                after: {
                  [DEBOUNCE_TIME]: "idle"
                },
                entry: ["moveDown"]
              },
              left: {
                after: {
                  [DEBOUNCE_TIME]: "idle"
                },
                entry: ["moveLeft"]
              },
              right: {
                after: {
                  [DEBOUNCE_TIME]: "idle"
                },
                entry: ["moveRight"]
              },
              fall: {
                after: {
                  [DEBOUNCE_TIME]: "idle"
                },
                entry: ["moveFall"]
              },
              end: {
                type: "final"
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
                entry: "moveDown",
                on: {
                  "": "idle"
                }
              }
            }
          }
        }
      }
    }
  },
  {
    actions: {
      moveDown: assign({
        y: ({ y }) => y + 1
      }),
      moveLeft: assign({
        x: ({ x }) => x - 1
      }),
      moveRight: assign({
        x: ({ x }) => x + 1
      }),
      moveFall: assign({
        y: () => 16
      })
    }
  }
);
