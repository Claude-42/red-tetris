import { useLanguage } from "vue-composable";
import { useI18n } from "vue-i18n";

export function useDefaultBrowserLanguage() {
  const { locale, availableLocales } = useI18n();
  const { language: defaultLanguage } = useLanguage();

  if (!availableLocales.includes(defaultLanguage)) {
    return;
  }

  locale.value = defaultLanguage;
}
