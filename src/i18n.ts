import de from "./translations/de";
import en from "./translations/en";
import es from "./translations/es";

const i18n = {
  fallbackLng: "en",
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    de,
    en,
    es,
  },
  whitelist: ["en", "es", "de"],
};

export default i18n;
