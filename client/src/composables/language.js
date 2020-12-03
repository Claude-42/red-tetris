import { useLanguage } from "vue-composable";

import { i18n } from "../plugins/i18n.js";

export function useDefaultBrowserLanguage() {
  const { availableLocales } = i18n.global;
  const { language: defaultLanguage } = useLanguage();

  if (!availableLocales.includes(defaultLanguage.value)) {
    return;
  }

  setI18nLanguage(defaultLanguage.value);
}

export function setI18nLanguage(locale) {
  i18n.global.locale.value = locale;

  document.querySelector("html").setAttribute("lang", locale);
}
