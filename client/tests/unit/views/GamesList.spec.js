import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/vue";
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
      games: "All games",
      "create-a-game": "Create a game",
      "no-games": "There is no game. Create one!",
    },

    fr: {
      games: "Toutes les parties",
      "create-a-game": "Créer une partie",
      "no-games": "Il n'y a aucune partie. Créez-en une !",
    },
  };

  const i18n = createI18n({
    legacy: false,
    locale: defaultLanguage,
    messages: messages,
  });

  return i18n;
}

async function createGamesListPage(defaultLanguage) {
  router.push("/games");
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

test("renders page with no games and a button to create a new game", async () => {
  const { getByRole, getByText } = await createGamesListPage();

  expect(getByRole("heading", { level: 2 }).textContent).toBe(
    "Toutes les parties"
  );

  expect(getByRole("link", { name: "Créer une partie" })).toBeInTheDocument();

  expect(
    getByText("Il n'y a aucune partie. Créez-en une !")
  ).toBeInTheDocument();
});
