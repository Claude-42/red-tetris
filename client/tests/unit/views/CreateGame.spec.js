import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createI18n } from "vue-i18n";
import { cleanup } from "socket.io-client";

import App from "@/App.vue";
import router from "@/router/index.js";

jest.mock("socket.io-client");

afterEach(() => {
  cleanup();
});

function setupI18n(defaultLanguage = "fr") {
  const messages = {
    en: {
      title: "Create a game",
      "input-placeholder": "Fill game name",
      "submit-label": "Create the game",
    },

    fr: {
      title: "Création d'une partie",
      "input-placeholder": "Saisir le nom de la partie",
      "submit-label": "Créer la partie",
    },
  };

  const i18n = createI18n({
    legacy: false,
    locale: defaultLanguage,
    messages: messages,
  });

  return i18n;
}

async function createCreateGamePage(defaultLanguage) {
  router.push("/create-game");
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

test("renders the form to create a new game", async () => {
  const { getByRole, getByPlaceholderText } = await createCreateGamePage();

  expect(getByRole("heading", { level: 2 }).textContent).toBe(
    "Création d'une partie"
  );

  expect(
    getByPlaceholderText("Saisir le nom de la partie")
  ).toBeInTheDocument();

  expect(getByRole("button", { name: /partie/i })).toBeInTheDocument();
});

test("prevents a game creation if its name is empty", async () => {
  const LOBBY_NAME = "";

  const { getByRole, getByPlaceholderText } = await createCreateGamePage();

  const lobbyNameInput = getByPlaceholderText("Saisir le nom de la partie");
  await userEvent.type(lobbyNameInput, LOBBY_NAME);

  const submitButton = getByRole("button", { name: /partie/i });
  await userEvent.click(submitButton);

  await wait(500);

  expect(lobbyNameInput).toBeInTheDocument();
});

test("creates a new game when the form is submitted", async () => {
  const LOBBY_NAME = "SuperPartie 3000";

  const { getByRole, getByPlaceholderText } = await createCreateGamePage();

  const lobbyNameInput = getByPlaceholderText("Saisir le nom de la partie");
  await userEvent.type(lobbyNameInput, LOBBY_NAME);

  const submitButton = getByRole("button", { name: /partie/i });
  await userEvent.click(submitButton);

  await waitFor(() => expect(lobbyNameInput).not.toBeInTheDocument());
});
