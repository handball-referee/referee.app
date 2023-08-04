import en from "./translations/en.json";
import es from "./translations/es.json";
import de from "./translations/de.json";
import fr from "./translations/fr.json";

const i18n = {
  fallbackLng: "en",
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    es,
    de,
    fr,
  },
  whitelist: ["en", "es", "de","fr"],
};

export default i18n;
