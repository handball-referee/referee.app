import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./translations/en";
import es from "./translations/es";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== "production",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
      es,
    },
    whitelist: ["en", "es"]
  })
;

export default i18n;
