<template>
  <header
    class="flex items-center justify-between px-8 py-3 mb-2 bg-white shadow align-center"
  >
    <h1 class="flex text-3xl font-bold">
      <span class="text-red-500">Red</span>
      Tetris
    </h1>

    <div>
      <span ref="dropDownRef" class="relative">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          id="mobile-menu"
          aria-haspopup="true"
          :aria-expanded="openLanguagesDropDown"
          @click="openLanguagesDropDown = !openLanguagesDropDown"
        >
          <GlobeIcon class="w-5 h-5 mr-2 text-gray-500" />

          {{ currentLocaleFullName }}

          <ChevronIcon down class="w-5 h-5 ml-2 -mr-1 text-gray-500" />
        </button>

        <transition
          enter-active-class="transition duration-200 ease-out transform"
          leave-active-class="transition duration-75 ease-in transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="openLanguagesDropDown"
            class="absolute right-0 w-48 py-1 mt-2 -mr-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            aria-labelledby="mobile-menu"
            role="menu"
          >
            <button
              v-for="{
                locale,
                localeFullName,
                disabled,
              } in availableLocalesWithFullName"
              :key="locale"
              :class="[
                disabled
                  ? 'text-gray-300 cursor-default'
                  : 'text-gray-700 hover:bg-gray-100',
                'inline-flex w-full px-4 py-2 text-sm ',
              ]"
              role="menuitem"
              :disabled="disabled"
              @click="setLocale(locale)"
            >
              {{ localeFullName }}
            </button>
          </div>
        </transition>
      </span>
    </div>
  </header>
</template>

<script>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useOnOutsidePress } from "vue-composable";

import GlobeIcon from "./GlobeIcon.vue";
import ChevronIcon from "./ChevronIcon.vue";

const LOCALES_FULL_NAME = {
  fr: "Français",
  en: "English",
};

export default {
  components: {
    GlobeIcon,
    ChevronIcon,
  },

  setup() {
    const openLanguagesDropDown = ref(false);
    const dropDownRef = ref(null);

    useOnOutsidePress(dropDownRef, () => {
      openLanguagesDropDown.value = false;
    });

    const { locale, availableLocales } = useI18n();
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
      openLanguagesDropDown.value = false;
    }

    return {
      openLanguagesDropDown,
      dropDownRef,

      currentLocaleFullName,
      currentLocale: locale,
      availableLocalesWithFullName,
      setLocale,
    };
  },
};
</script>
