import { createI18n } from "vue-i18n";
import en from "./locale/en.json";
import ar from "./locale/ar.json";

function loadLocaleMessages() {
  const locales = [{ en: en }, { ar: ar }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}
export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});
