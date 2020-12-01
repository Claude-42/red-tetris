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
          v-for="song in availableSongs"
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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import GlobeIcon from "./GlobeIcon.vue";
import MusicIcon from "./MusicIcon.vue";

import AppMenu from "./AppMenu.vue";
import AppMenuItem from "./AppMenuItem.vue";

const LOCALES_FULL_NAME = {
  fr: "Français",
  en: "English",
};

function useSong() {
  const selectedSong = ref(null);
  const availableSongs = ["Song 1", "Song 2"];
  const noSongSelected = computed(() => selectedSong.value === null);

  return {
    selectedSong,
    availableSongs,
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
      locale.value = localeSelected;
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
