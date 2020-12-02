import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createI18n } from "vue-i18n";
import { serverSocket, cleanup } from "socket.io-client";

import App from "@/App.vue";
import router from "@/router/index.js";
// import { useAppMachineProvider } from "@/composables/app.js";

jest.mock("socket.io-client");

afterEach(() => {
  cleanup();
});

function setupI18n(defaultLanguage = "fr") {
  const messages = {
    en: {
      title: "My nickname",
      "input-placeholder": "Fill my nickname",
      "invalid-username": "Nickname already taken",
      "submit-alt": "Confirm my nickname",

      // GamesList.vue translations
      games: "All games",
    },

    fr: {
      title: "Mon pseudo",
      "input-placeholder": "Saisir mon pseudo",
      "invalid-username": "Ce surnom est déjà pris",
      "submit-alt": "Confirmer mon pseudo",

      // GamesList.vue translations
      games: "Toutes les parties",
    },
  };

  const i18n = createI18n({
    legacy: false,
    locale: defaultLanguage,
    messages: messages,
  });

  return i18n;
}

async function createHomePage(defaultLanguage) {
  router.push("/");
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

test("renders username form", async () => {
  const { getByRole, getByPlaceholderText } = await createHomePage();

  const title = getByRole("heading", { level: 2 });
  expect(title.textContent).toBe("Mon pseudo");

  const input = getByPlaceholderText("Saisir mon pseudo");
  expect(input).toBeInTheDocument();

  const submitButton = getByRole("button", { name: "Confirmer mon pseudo" });
  expect(submitButton).toBeInTheDocument();
});

test("does not take care of empty username when submitted", async () => {
  const { getByRole, getByPlaceholderText } = await createHomePage();

  // Try to submit an empty form
  const submitButton = getByRole("button", { name: "Confirmer mon pseudo" });
  await userEvent.click(submitButton);

  // Are we still on Home page?
  const input = getByPlaceholderText("Saisir mon pseudo");
  expect(input).toBeInTheDocument();
});

test("redirects to games list page when a valid username has been provided", async () => {
  const { getByRole, getByPlaceholderText } = await createHomePage();

  // Server acknowledges socket connection.
  serverSocket.emit("connect");

  await wait(100);

  const input = getByPlaceholderText("Saisir mon pseudo");
  await userEvent.type(input, "Roger 2");

  // Try to submit an empty form
  const submitButton = getByRole("button", { name: "Confirmer mon pseudo" });
  await userEvent.click(submitButton);

  await wait(100);

  // Server sends a successful response
  serverSocket.emit("NEW_USER", "OK");

  await waitFor(() =>
    expect(
      getByRole("heading", { level: 2, name: "Toutes les parties" })
    ).toBeInTheDocument()
  );
});

test("triggers an alert when the username is already taken", async () => {
  const { getByRole, getByPlaceholderText, getByText } = await createHomePage();

  // Server acknowledges socket connection.
  serverSocket.emit("connect");

  await wait(100);

  const input = getByPlaceholderText("Saisir mon pseudo");
  await userEvent.type(input, "Roger 2");

  // Try to submit an empty form
  const submitButton = getByRole("button", { name: "Confirmer mon pseudo" });
  await userEvent.click(submitButton);

  await wait(100);

  // Server sends a successful response
  serverSocket.emit("NEW_USER", "FAIL");

  await waitFor(() =>
    expect(getByText("Ce surnom est déjà pris")).toBeInTheDocument()
  );
});
