import { assign, forwardTo, Machine, send } from "xstate";
import io from "socket.io-client";

const WEBSOCKET_URL = "http://localhost:3030";
const GO_DOWN_TIME = 1000;
const DEBOUNCE_TIME = 100;

export const appMachine = Machine(
  {
    id: "app",
    context: {
      username: undefined,

      grid: undefined,
      nextPiece: undefined,
    },
    invoke: {
      id: "websocket",
      src: "setupWebsocket",
    },
    initial: "initializing",
    states: {
      initializing: {
        on: {
          SOCKET_CONNECTED: "waiting",
        },
      },
      waiting: {
        on: {
          START_GAME: {
            target: "playing",
            actions: "sendStartGameToWebsocket",
          },
        },
      },
      playing: {
        initial: "playing",
        states: {
          playing: {
            type: "parallel",
            states: {
              moving: {
                initial: "idle",
                states: {
                  idle: {
                    on: {
                      "MOVE.ROTATE": {
                        target: "debounce",
                        actions: "forwardToWebsocket",
                      },
                      "MOVE.LEFT": {
                        target: "debounce",
                        actions: "forwardToWebsocket",
                      },
                      "MOVE.RIGHT": {
                        target: "debounce",
                        actions: "forwardToWebsocket",
                      },
                      "MOVE.DOWN": {
                        target: "debounce",
                        actions: "forwardToWebsocket",
                      },
                      "MOVE.DOWN_AUTOMATIC": {
                        target: "debounce",
                        actions: "forwardToWebsocket",
                      },
                      "MOVE.FALL": {
                        target: "debounce",
                        actions: "forwardToWebsocket",
                      },
                    },
                  },
                  debounce: {
                    after: {
                      [DEBOUNCE_TIME]: "idle",
                    },
                  },
                },
              },
              moveDownTimer: {
                initial: "idle",
                states: {
                  idle: {
                    after: {
                      [GO_DOWN_TIME]: "inc",
                    },
                  },
                  inc: {
                    entry: "sendAutomaticDownToWebsocket",
                    on: {
                      "": "idle",
                    },
                  },
                },
              },
            },
            on: {
              UPDATE_GRID_DATA: {
                actions: assign({
                  grid: (_context, { payload: { PAINT_GRID } }) => PAINT_GRID,
                  nextPiece: (_context, { payload: { NEXT_PIECE } }) =>
                    NEXT_PIECE,
                }),
              },

              GAME_OVER: {
                target: "end",
              },
            },
          },
          end: {},
        },
      },
    },
    on: {
      SET_USERNAME: {
        actions: "setUsername",
      },
    },
  },
  {
    services: {
      setupWebsocket: () => (callback, onReceive) => {
        const socket = io(WEBSOCKET_URL);

        socket.on("connect", () => {
          callback("SOCKET_CONNECTED");
        });

        socket.on("ownGrid", (payload) => {
          callback({
            type: "UPDATE_GRID_DATA",
            payload,
          });
        });

        socket.on("gameOver", () => {
          callback({
            type: "GAME_OVER",
          });
        });

        onReceive((event) => {
          switch (event.type) {
            case "START_GAME":
              socket.emit("start");
              break;
            case "MOVE.ROTATE":
              socket.emit("move", { type: "ROTATE" });
              break;
            case "MOVE.DOWN":
              socket.emit("move", { type: "DOWN" });
              break;
            case "MOVE.DOWN_AUTOMATIC":
              socket.emit("move", { type: "DOWN_AUTOMATIC" });
              break;
            case "MOVE.LEFT":
              socket.emit("move", { type: "LEFT" });
              break;
            case "MOVE.RIGHT":
              socket.emit("move", { type: "RIGHT" });
              break;
            case "MOVE.FALL":
              socket.emit("move", { type: "FALL" });
              break;
          }
        });

        return () => {
          socket.disconnect();
        };
      },
    },
    actions: {
      sendStartGameToWebsocket: send("START_GAME", { to: "websocket" }),
      forwardToWebsocket: forwardTo("websocket"),
      sendAutomaticDownToWebsocket: send("MOVE.DOWN_AUTOMATIC", {
        to: "websocket",
      }),
      setUsername: assign({
        username: (_context, { data: username }) => {
          console.log("username from state machine", username);

          return username;
        },
      }),
    },
  }
);
