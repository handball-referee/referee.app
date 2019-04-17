import en from "./translations/en";
import es from "./translations/es";

const i18n = {
  fallbackLng: "en",
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    es,
  },
  whitelist: ["en", "es"],
};

export default i18n;
