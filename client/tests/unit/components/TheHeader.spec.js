import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createI18n } from "vue-i18n";

import TheHeader from "@/components/TheHeader.vue";

const MediaMocks = {
  load: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  addTextTrack: jest.fn(),
};

beforeAll(() => {
  for (const [name, mock] of Object.entries(MediaMocks)) {
    window.HTMLMediaElement.prototype[name] = mock;
  }
});

afterAll(() => {
  for (const name of Object.keys(MediaMocks)) {
    delete window.HTMLMediaElement.prototype[name];
  }
});

function setupI18n(defaultLanguage = "fr") {
  const messages = {
    en: {
      music: "Music",
      "no-music": "No music",
    },

    fr: {
      music: "Musique",
      "no-music": "Aucune musique",
    },
  };

  const i18n = createI18n({
    legacy: false,
    locale: defaultLanguage,
    messages: messages,
  });

  return i18n;
}

function createTheHeader(defaultLanguage) {
  const utils = render(TheHeader, {
    global: {
      plugins: [setupI18n(defaultLanguage)],
    },
  });

  return utils;
}

test("renders music player in french", () => {
  const { getByRole } = createTheHeader();

  expect(getByRole("button", { name: "Musique" })).toBeInTheDocument();
});

test("renders music player in english", () => {
  const { getByRole } = createTheHeader("en");

  expect(getByRole("button", { name: "Music" })).toBeInTheDocument();
});

test("plays official theme, pauses it and tries to play the other theme", async () => {
  const { getByRole } = createTheHeader();

  const musicButton = getByRole("button", { name: "Musique" });

  // Open menu
  await userEvent.click(musicButton);

  // Select the official theme
  const officialThemeButton = getByRole("menuitem", { name: "Official" });
  await fireEvent.click(officialThemeButton);

  expect(MediaMocks.play).toHaveBeenCalledTimes(1);

  // The menu must be closed
  expect(officialThemeButton).not.toBeInTheDocument();

  // Open the menu again
  await userEvent.click(musicButton);

  const pauseThemeButton = getByRole("menuitem", { name: "Aucune musique" });
  await fireEvent.click(pauseThemeButton);

  expect(MediaMocks.pause).toHaveBeenCalledTimes(1);

  // The menu must be closed
  expect(officialThemeButton).not.toBeInTheDocument();

  // Open the menu again
  await userEvent.click(musicButton);

  const otherThemeButton = getByRole("menuitem", { name: "Techno" });
  await fireEvent.click(otherThemeButton);

  expect(MediaMocks.play).toHaveBeenCalledTimes(2);
});

test.skip("sets app locale to english, then to french", async () => {
  const { getByRole } = createTheHeader();

  const musicButton = getByRole("button", { name: "Musique" });
  const localeButton = getByRole("button", { name: "Français" });

  // Open menu
  await userEvent.click(localeButton);

  // Select english
  const englishLocaleButton = getByRole("menuitem", { name: "English" });
  await fireEvent.click(englishLocaleButton);

  // The menu must be closed
  expect(englishLocaleButton).not.toBeInTheDocument();

  // The music button text must have been translated.
  expect(musicButton.textContent).toContain("Music");

  // Open menu
  await userEvent.click(localeButton);
  // Select english
  const frenchLocaleButton = getByRole("menuitem", { name: "Français" });
  await fireEvent.click(frenchLocaleButton);

  // The menu must be closed
  expect(englishLocaleButton).not.toBeInTheDocument();

  // The music button text must have been translated.
  expect(musicButton.textContent).toContain("Musique");
});
