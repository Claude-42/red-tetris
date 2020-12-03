<i18n lang="yaml">
en:
  music: "Music"
  no-music: "No music"

fr:
  music: "Musique"
  no-music: "Aucune musique"
</i18n>

<template>
  <header
    class="flex items-center justify-between px-8 py-3 mb-2 bg-white shadow align-center"
  >
    <h1 class="flex text-3xl font-bold">
      <span class="text-red-500">Red</span>
      Tetris
    </h1>

    <div class="flex items-center space-x-4">
      <AppMenu>
        <template #button-inner>
          <MusicIcon class="w-5 h-5 mr-2 text-gray-500" />

          {{ t("music") }}
        </template>

        <AppMenuItem :disabled="noSongSelected" @click="selectedSong = null">
          {{ t("no-music") }}
        </AppMenuItem>

        <AppMenuItem
          v-for="{ name: song } in availableSongs"
          :key="song"
          :disabled="song === selectedSong"
          @click="selectedSong = song"
        >
          {{ song }}
        </AppMenuItem>
      </AppMenu>

      <AppMenu>
        <template #button-inner>
          <GlobeIcon class="w-5 h-5 mr-2 text-gray-500" />

          {{ currentLocaleFullName }}
        </template>

        <AppMenuItem
          v-for="{
            locale,
            localeFullName,
            disabled,
          } in availableLocalesWithFullName"
          :key="locale"
          :disabled="disabled"
          @click="setLocale(locale)"
        >
          {{ localeFullName }}
        </AppMenuItem>
      </AppMenu>
    </div>
  </header>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { useAudio } from "../composables/audio.js";
import { setI18nLanguage } from "../composables/language.js";

import GlobeIcon from "./GlobeIcon.vue";
import MusicIcon from "./MusicIcon.vue";
import AppMenu from "./AppMenu.vue";
import AppMenuItem from "./AppMenuItem.vue";

const LOCALES_FULL_NAME = {
  fr: "Français",
  en: "English",
};

function useSong() {
  const SONGS = computed(() => [
    {
      name: "Official",
      url:
        "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3",
    },
    {
      name: "DJ Getdown",
      url: "https://sendeyo.com/up/d/d2479eda3a",
    },
    {
      name: "Techno",
      url: "https://sendeyo.com/up/d/93f5b8d6cb",
    },
    {
      name: "Piano",
      url: "https://sendeyo.com/up/d/7567fa2200",
    },
  ]);

  const { playInLoop, stop } = useAudio();

  const selectedSong = ref(null);
  const selectedSongData = computed(() =>
    SONGS.value.find(({ name }) => name === selectedSong.value)
  );
  const noSongSelected = computed(() => selectedSong.value === null);

  // When the selected song changes, stop the previous one and play the new one.
  // We play the song in loop.
  watch(selectedSongData, (selectedSongData) => {
    if (selectedSongData === undefined) {
      stop();
      return;
    }
    if (selectedSongData.url === "") {
      return;
    }

    playInLoop(selectedSongData.url);
  });

  return {
    selectedSong,
    availableSongs: SONGS,
    noSongSelected,
  };
}

export default {
  components: {
    GlobeIcon,
    MusicIcon,
    AppMenu,
    AppMenuItem,
  },

  setup() {
    const { t, locale, availableLocales } = useI18n();
    const availableLocalesWithFullName = computed(() => {
      return availableLocales.map((availableLocale) => ({
        locale: availableLocale,
        localeFullName: LOCALES_FULL_NAME[availableLocale],
        disabled: availableLocale === locale.value,
      }));
    });
    const currentLocaleFullName = computed(
      () => LOCALES_FULL_NAME[locale.value]
    );

    function setLocale(localeSelected) {
      setI18nLanguage(localeSelected);
    }

    const { selectedSong, availableSongs, noSongSelected } = useSong();

    return {
      t,

      selectedSong,
      noSongSelected,
      availableSongs,

      currentLocaleFullName,
      currentLocale: locale,
      availableLocalesWithFullName,
      setLocale,
    };
  },
};
</script>
