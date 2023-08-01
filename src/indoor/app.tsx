import "regenerator-runtime/runtime";
import "core-js/features/promise";
import "core-js/features/object/assign";
import "core-js/features/array/includes";
import "whatwg-fetch";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import { createRoot } from "react-dom/client";
import AppShell from "./components/AppShell";
import i18n from "./i18n";
import PrivacyProvider from "../core/context/PrivacyProvider";

if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18n);

const rootElement = document.getElementById("app");
const root = createRoot(rootElement!);

const app = (
  <BrowserRouter>
    <PrivacyProvider
      trackingId={process.env.GA_TRACKING_ID}
    >
      <AppShell />
    </PrivacyProvider>
  </BrowserRouter>
);

root.render(app);
