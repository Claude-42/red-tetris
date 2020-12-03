import { assign, forwardTo, Machine, send } from "xstate";
import io from "socket.io-client";

import { WEBSOCKET_URL } from "@/constants/env.js";

const GO_DOWN_TIME = 1000;
const DEBOUNCE_TIME = 100;

export const appMachine = Machine(
  {
    id: "app",
    context: {
      bypassLobbiesFetchingAfterUsernameFilling: undefined,

      username: undefined,
      isOwner: undefined,
      score: 0,

      availableLobbies: undefined,

      lobbyName: undefined,
      lobbyStatus: undefined,
      lobbyPlayersList: undefined,
      lobbyPlayersShadows: undefined,

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
          loading: {
            entry: "sendNewUserToWebsocket",
            on: {
              SET_USERNAME: undefined,

              SELECTION_SUCCESS: [
                {
                  cond: ({ bypassLobbiesFetchingAfterUsernameFilling }) =>
                    bypassLobbiesFetchingAfterUsernameFilling === true,
                  target: "#app.choosingLobby",
                },
                {
                  target: "#app.loadingLobbies",
                },
              ],
              SELECTION_FAIL: {
                target: "failure",
              },
            },
          },
          failure: {},
        },
        on: {
          SET_USERNAME: {
            target: ".loading",
            actions: "setUsername",
          },
          SET_USERNAME_BYPASS_LOBBIES: {
            target: ".loading",
            actions: [
              "setUsername",
              "toggleBypassLobbiesFetchingAfterUsernameFilling",
            ],
          },
        },
      },

      loadingLobbies: {
        initial: "firstGame",
        states: {
          firstGame: {},
          newGame: {
            entry: "resetGameContext",
          },
        },
        on: {
          LOAD_LOBBIES: {
            target: "choosingLobby",
            actions: "getAllLobbies",
          },
        },
      },

      choosingLobby: {
        on: {
          SELECT_LOBBY: {
            target: "waitingToJoinLobby",
            actions: "setLobbyName",
          },
        },
      },

      waitingToJoinLobby: {
        on: {
          JOIN_LOBBY: {
            target: "joiningLobby",
            actions: "sendJoinLobbyToWebsocket",
          },
        },
      },

      joiningLobby: {
        on: {
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
          UPDATE_GRID_DATA: {
            target: "readyToPlay",
            actions: "setGridData",
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
          QUIT_LOBBY: {
            target: "loadingLobbies.newGame",
            actions: "sendQuitLobbyToWebsocket",
          },

          UPDATE_GRID_DATA: {
            target: "readyToPlay",
            actions: "setGridData",
          },
        },
      },

      readyToPlay: {
        on: {
          START_GAME: "playing",
          UPDATE_GRID_DATA: {
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
                    always: "idle",
                  },
                },
              },
            },
            on: {
              UPDATE_GRID_DATA: {
                actions: "setGridData",
              },

              GAME_OVER: {
                target: "gameOver",
              },
            },
          },
          gameOver: {
            on: {
              QUIT_LOBBY: {
                target: "#app.loadingLobbies.newGame",
                actions: "sendQuitLobbyToWebsocket",
              },

              GAME_ENDED: {
                target: "waitingToExitRoom",
              },
            },
          },
          waitingToExitRoom: {
            after: {
              3_000: {
                target: "end",
              },
            },
          },
          end: {
            type: "final",
          },
        },
        onDone: {
          target: "waitingToStartLobby",
        },
        on: {
          SET_LOBBY_PLAYERS: {
            actions: "setLobbyPlayers",
          },
          SET_LOBBY_PLAYERS_SHADOWS: {
            actions: "setLobbyPlayersShadows",
          },
          SET_SCORE: {
            actions: "setScore",
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

        socket.on("UPDATE_SCORE", ({ score }) => {
          callback({
            type: "SET_SCORE",
            data: {
              score,
            },
          });
        });

        socket.on("NEW_SHADOW", (players) => {
          callback({
            type: "SET_LOBBY_PLAYERS_SHADOWS",
            data: {
              players,
            },
          });
        });

        socket.on("GAME_OVER", () => {
          callback({
            type: "GAME_OVER",
          });
        });

        socket.on("END_GAME", () => {
          callback({
            type: "GAME_ENDED",
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
            case "START_GAME": {
              const { lobbyName } = event.data;

              socket.emit("LAUNCH_GAME", {
                lobbyName,
              });
              break;
            }
            case "MOVE.ROTATE":
              socket.emit("MOVE", { type: "ROTATE" });
              break;
            case "MOVE.DOWN":
              socket.emit("MOVE", { type: "DOWN" });
              break;
            case "MOVE.DOWN_AUTOMATIC":
              socket.emit("MOVE", { type: "DOWN_AUTOMATIC" });
              break;
            case "MOVE.LEFT":
              socket.emit("MOVE", { type: "LEFT" });
              break;
            case "MOVE.RIGHT":
              socket.emit("MOVE", { type: "RIGHT" });
              break;
            case "MOVE.FALL":
              socket.emit("MOVE", { type: "FALL" });
              break;
            case "QUIT_LOBBY": {
              const { lobbyName } = event.data;

              socket.emit("QUIT_LOBBY", lobbyName);
              break;
            }
          }
        });

        return () => {
          socket.disconnect();
        };
      },
    },
    actions: {
      toggleBypassLobbiesFetchingAfterUsernameFilling: assign({
        bypassLobbiesFetchingAfterUsernameFilling: true,
      }),
      sendStartGameToWebsocket: send(
        ({ lobbyName }) => ({
          type: "START_GAME",
          data: {
            lobbyName,
          },
        }),
        { to: "websocket" }
      ),
      forwardToWebsocket: forwardTo("websocket"),
      sendAutomaticDownToWebsocket: send("MOVE.DOWN_AUTOMATIC", {
        to: "websocket",
      }),
      setUsername: assign({
        username: (_context, { data: username }) => username,
      }),
      setLobbyName: assign({
        lobbyName: (_context, { data: lobbyName }) => lobbyName,
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
      setScore: assign({
        score: (_context, { data: { score } }) => score,
      }),
      setLobbyPlayersShadows: assign({
        lobbyPlayersShadows: ({ username }, { data: { players } }) =>
          players.filter(({ name }) => name !== username),
      }),
      sendQuitLobbyToWebsocket: send(
        (context) => {
          const {
            oldGameContext: { lobbyName },
          } = context;

          return {
            type: "QUIT_LOBBY",
            data: { lobbyName },
          };
        },
        {
          to: "websocket",
        }
      ),
      resetGameContext: assign({
        isOwner: undefined,
        score: 0,

        lobbyName: undefined,
        lobbyStatus: undefined,
        lobbyPlayersList: undefined,
        lobbyPlayersShadows: undefined,

        grid: undefined,
        nextPiece: undefined,

        oldGameContext: ({
          isOwner,
          score,
          lobbyName,
          lobbyStatus,
          lobbyPlayersList,
          lobbyPlayersShadows,
          grid,
          nextPiece,
        }) => ({
          isOwner,
          score,
          lobbyName,
          lobbyStatus,
          lobbyPlayersList,
          lobbyPlayersShadows,
          grid,
          nextPiece,
        }),
      }),
      logContext: assign((context) => {
        console.log("context", context);

        return context;
      }),
    },
  }
);
