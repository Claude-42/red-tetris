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
      "game-id": "Game - {id}",
      "start-game": "Start game",
      "leave-game": "Leave game",
      categories: {
        playing: "Playing",
        pending: "Waiting",
      },

      // Home.vue translations
      "invalid-username": "Nickname already taken",

      // GameFull.vue translations
      title: "The game is full",
    },

    fr: {
      "game-id": "Partie - {id}",
      "start-game": "Lancer le jeu",
      "leave-game": "Quitter le jeu",
      categories: {
        playing: "En jeu",
        pending: "En attente",
      },

      // Home.vue translations
      "invalid-username": "Ce surnom est déjà pris",

      // GameFull.vue translations
      title: "La partie ne peut pas recevoir d'autres joueurs",
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

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

test("renders waiting room with the current user", async () => {
  const LOBBY_NAME = "SuperPartie 3000";
  const USERNAME = "Roger 1";

  const { getByRole, getByText } = await createGamePage({
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
    expect(getByRole("heading", { level: 2 })).toHaveTextContent(
      `Partie - ${LOBBY_NAME}`
    )
  );

  expect(getByText(USERNAME)).toBeInTheDocument();
});

test("prevents access if the game is full", async () => {
  const LOBBY_NAME = "SuperPartie 3000";
  const USERNAME = "Roger 1";

  const { getByText } = await createGamePage({
    defaultRoute: `${LOBBY_NAME}[${USERNAME}]`,
  });

  serverSocket.emit("connect");

  await wait(100);

  // Server sends a successful response
  serverSocket.emit("NEW_USER", "OK");

  await wait(100);

  serverSocket.emit("ROOM_STATUS", "FULL");

  await waitFor(() =>
    expect(
      getByText("La partie ne peut pas recevoir d'autres joueurs")
    ).toBeInTheDocument()
  );
});

test("prevents access if the username is already taken", async () => {
  const LOBBY_NAME = "SuperPartie 3000";
  const USERNAME = "Roger 1";

  const { getByText } = await createGamePage({
    defaultRoute: `${LOBBY_NAME}[${USERNAME}]`,
  });

  serverSocket.emit("connect");

  await wait(100);

  // Server sends a successful response
  serverSocket.emit("NEW_USER", "FAIL");

  await wait(100);

  await waitFor(() =>
    expect(getByText("Ce surnom est déjà pris")).toBeInTheDocument()
  );
});

test("starts game if everything is correct", async () => {
  const LOBBY_NAME = "SuperPartie 3000";
  const USERNAME = "Roger 1";

  const { getByRole, router } = await createGamePage({
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

  await waitFor(() =>
    expect(getByRole("heading", { level: 2 })).toHaveTextContent(LOBBY_NAME)
  );
});
