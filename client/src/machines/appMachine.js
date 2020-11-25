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

      lobbyName: undefined,
      lobbyStatus: undefined,
      lobbyPlayersList: undefined,

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
          SOCKET_CONNECTED: "waitingToJoinLobby",
        },
      },
      waitingToJoinLobby: {
        on: {
          JOIN_LOBBY: {
            actions: [
              assign({
                lobbyName: (_context, { data: lobbyName }) => lobbyName,
              }),
              "sendJoinLobbyToWebsocket",
            ],
          },

          GAME_ALREADY_STARTED: {
            actions: assign({
              lobbyStatus: "ALREADY_STARTED",
            }),
          },
          GAME_FULL: {
            actions: assign({
              lobbyStatus: "FULL",
            }),
          },
          GAME_WAITING: {
            actions: assign({
              lobbyStatus: "WAITING",
            }),
          },

          SET_LOBBY_PLAYERS: {
            target: "waitingToStartLobbyLoading",
            actions: assign({
              lobbyPlayersList: (_context, { data: playersList }) =>
                playersList,
            }),
          },
        },
      },
      waitingToStartLobbyLoading: {
        after: {
          1000: "waitingToStartLobby",
        },
      },
      waitingToStartLobby: {
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

        socket.on("ROOM_STATUS", (roomStatus) => {
          switch (roomStatus) {
            case "IN_GAME":
              callback("GAME_ALREADY_STARTED");
              break;
            case "FULL":
              callback("GAME_FULL");
              break;
            case "OK":
              callback("GAME_WAITING");
              break;
          }
        });

        socket.on("PLAYER_JOINED_GAME", (playersList) => {
          callback({
            type: "SET_LOBBY_PLAYERS",
            data: playersList.map(({ name, inGame, owner }) => ({
              name,
              status: inGame ? "PLAYING" : "PENDING",
              owner,
            })),
          });
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
            case "JOIN_LOBBY": {
              const { lobbyName, playerName } = event.data;
              if (lobbyName === "" || playerName === "") {
                return;
              }

              socket.emit("JOIN_LOBBY", {
                lobbyName,
                playerName,
              });
              break;
            }
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
      sendJoinLobbyToWebsocket: send(
        ({ lobbyName, username }) => ({
          type: "JOIN_LOBBY",
          data: {
            lobbyName,
            playerName: username,
          },
        }),
        {
          to: "websocket",
        }
      ),
    },
  }
);
