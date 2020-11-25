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
      isOwner: undefined,

      availableLobbies: undefined,

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
          SOCKET_CONNECTED: "usernameSelection",
        },
      },
      usernameSelection: {
        initial: "idle",
        states: {
          idle: {},
          failure: {},
        },
        on: {
          SET_USERNAME: {
            actions: ["setUsername", "sendNewUserToWebsocket"],
          },

          SELECTION_SUCCESS: {
            target: "waitingToJoinLobby",
          },
          SELECTION_FAIL: {
            target: "usernameSelection.failure",
          },
        },
      },
      waitingToJoinLobby: {
        entry: "getAllLobbies",

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
            actions: "setLobbyPlayers",
          },
        },
      },
      waitingToStartLobbyLoading: {
        after: {
          1000: "waitingToStartLobby",
        },
        on: {
          SET_LOBBY_PLAYERS: {
            actions: "setLobbyPlayers",
          },
        },
      },
      waitingToStartLobby: {
        on: {
          START_GAME: {
            actions: "sendStartGameToWebsocket",
          },
          SET_LOBBY_PLAYERS: {
            actions: "setLobbyPlayers",
          },

          UPDATE_GRID_DATA: {
            target: "playing",
            actions: "setGridData",
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
                actions: "setGridData",
              },

              GAME_OVER: {
                target: "end",
              },
            },
          },
          end: {},
        },
        on: {
          SET_LOBBY_PLAYERS: {
            actions: "setLobbyPlayers",
          },
        },
      },
    },
    on: {
      SET_ALL_LOBBIES: {
        actions: "setAllLobbies",
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

        socket.on("GET_ALL_LOBBIES", (lobbies) => {
          callback({
            type: "SET_ALL_LOBBIES",
            data: lobbies,
          });
        });

        socket.on("NEW_USER", (status) => {
          switch (status) {
            case "OK":
              callback("SELECTION_SUCCESS");
              break;
            case "FAIL":
              callback("SELECTION_FAIL");
              break;
            default:
              throw new Error("Invalid status received");
          }
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

        socket.on("OWN_GRID", (payload) => {
          callback({
            type: "UPDATE_GRID_DATA",
            payload,
          });
        });

        socket.on("GAME_OVER", () => {
          callback({
            type: "GAME_OVER",
          });
        });

        onReceive((event) => {
          switch (event.type) {
            case "SET_USERNAME": {
              const username = event.data;

              socket.emit("NEW_USER", { userName: username });
              break;
            }
            case "GET_ALL_LOBBIES":
              socket.emit("GET_ALL_LOBBIES");
              break;
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
        username: (_context, { data: username }) => username,
      }),
      getAllLobbies: send("GET_ALL_LOBBIES", {
        to: "websocket",
      }),
      setAllLobbies: assign({
        availableLobbies: (_context, { data: lobbies }) => lobbies,
      }),
      sendNewUserToWebsocket: send(
        ({ username }) => ({
          type: "SET_USERNAME",
          data: username,
        }),
        {
          to: "websocket",
        }
      ),
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
      setLobbyPlayers: assign({
        lobbyPlayersList: (_context, { data: playersList }) => playersList,
        isOwner: ({ username }, { data: playersList }) =>
          playersList.some(
            ({ owner, name }) => name === username && owner === true
          ),
      }),
      setGridData: assign({
        grid: (_context, { payload: { PAINT_GRID } }) => PAINT_GRID,
        nextPiece: (_context, { payload: { NEXT_PIECE } }) => NEXT_PIECE,
      }),
    },
  }
);
