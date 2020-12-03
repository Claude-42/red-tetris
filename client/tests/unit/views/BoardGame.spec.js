import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createI18n } from "vue-i18n";
import { serverSocket, cleanup } from "socket.io-client";

import App from "@/App.vue";
import router from "@/router/index.js";

jest.mock("socket.io-client");

afterEach(() => {
  cleanup();
});

function setupI18n(defaultLanguage = "fr") {
  const messages = {
    en: {
      "leave-game": "Leave game",
      "score-title": "Score",
      "next-piece-title": "Next piece",
      "other-players-title": "Other players",

      // TheBoardGameShadowList.vue translations
      "no-other-players": "There is no other player",

      // TheGameOverScreen.vue translations
      title: "Game Over",

      // Game.vue translations
      "game-id": "Game - {id}",
      "start-game": "Start game",
      categories: {
        playing: "Playing",
        pending: "Waiting",
      },

      // Home.vue translations
      "invalid-username": "Nickname already taken",
    },

    fr: {
      "leave-game": "Quitter le jeu",
      "score-title": "Score",
      "next-piece-title": "Prochaine pièce",
      "other-players-title": "Les autres joueurs",

      // TheBoardGameShadowList.vue translations
      "no-other-players": "Vous êtes le seul joueur",

      // TheGameOverScreen.vue translations
      title: "Game Over",

      // Game.vue translations
      "game-id": "Partie - {id}",
      "start-game": "Lancer le jeu",
      categories: {
        playing: "En jeu",
        pending: "En attente",
      },

      // Home.vue translations
      "invalid-username": "Ce surnom est déjà pris",
    },
  };

  const i18n = createI18n({
    legacy: false,
    locale: defaultLanguage,
    messages: messages,
  });

  return i18n;
}

async function createGamePage({ defaultLanguage, defaultRoute }) {
  router.push(defaultRoute);
  await router.isReady();

  const utils = render(App, {
    global: {
      plugins: [setupI18n(defaultLanguage), router],
    },
  });

  return {
    ...utils,
    router,
  };
}

async function goToBoardGamePage() {
  const LOBBY_NAME = "SuperPartie 3000";
  const USERNAME = "Roger 1";

  const { getByRole, router, ...utils } = await createGamePage({
    defaultRoute: `${LOBBY_NAME}[${USERNAME}]`,
  });

  serverSocket.emit("connect");

  await wait(100);

  // Server sends a successful response
  serverSocket.emit("NEW_USER", "OK");

  await wait(100);

  serverSocket.emit("ROOM_STATUS", "OK");

  await wait(100);

  serverSocket.emit("PLAYER_JOINED_GAME", [
    {
      name: USERNAME,
      inGame: false,
      owner: true,
    },
  ]);

  await waitFor(() =>
    expect(getByRole("button", { name: /lancer/i })).toBeInTheDocument()
  );

  const startGameButton = getByRole("button", { name: /lancer/i });
  await userEvent.click(startGameButton);

  serverSocket.emit("OWN_GRID", {
    PAINT_GRID: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    NEXT_PIECE: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  });

  await router.isReady();

  return {
    LOBBY_NAME,
    USERNAME,

    getByRole,
    router,
    ...utils,
  };
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

test.skip("redirects the user to the waiting room when the game is finished", async () => {
  const {
    LOBBY_NAME,
    getByRole,
    getByText,
    router,
  } = await goToBoardGamePage();

  await wait(100);

  serverSocket.emit("GAME_OVER");

  await waitFor(() => expect(getByText("Game Over")).toBeVisible());

  await wait(100);

  serverSocket.emit("END_GAME");

  await router.isReady();

  await waitFor(
    () =>
      expect(getByRole("heading", { level: 2 })).toHaveTextContent(
        `Partie - ${LOBBY_NAME}`
      ),
    {
      timeout: 5_000,
    }
  );
});
