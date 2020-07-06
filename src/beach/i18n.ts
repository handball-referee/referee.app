import en from "./translations/en.json";
import es from "./translations/es.json";

const i18n = {
  fallbackLng: "en",
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    es
  },
  whitelist: ["en", "es"],
};

export default i18n;
