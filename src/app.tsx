import "@babel/polyfill";
import React from "react";
import { loadableReady } from "@loadable/component";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import * as Sentry from "@sentry/browser";
import AppShell from "./components/AppShell";
import i18n from "./i18n";

if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENV,
  });
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18n);

const rootElement = document.getElementById("app");

const app = (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

if (process.env.NODE_ENV === "production") {
  loadableReady(() => {
    hydrate(app, rootElement);
  });
} else {
  render(app, rootElement);
}
