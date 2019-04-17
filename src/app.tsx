import React from "react";
import { loadableReady } from "@loadable/component";
import { hydrate, render } from "react-dom";
import { JssProvider } from "react-jss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import { createStore } from "redux";
import { createGenerateClassName, MuiThemeProvider } from "@material-ui/core/styles";
import AppShell from "./components/AppShell";
import reducer from "./reducers";
import theme from "./theme";
import i18n from "./i18n";

if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw/sw.js");
  }
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18n);

// @ts-ignore
const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line
// @ts-ignore
delete window.__PRELOADED_STATE__; // eslint-disable-line

const rootElement = document.getElementById("app");
const store = createStore(reducer(), preloadedState);
const generateClassName = createGenerateClassName();

class Main extends React.Component {
  public componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    return <AppShell />;
  }
}

const app = (
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  </JssProvider>
);

if (process.env.NODE_ENV === "production") {
  loadableReady(() => {
    hydrate(app, rootElement);
  });
} else {
  render(app, rootElement);
}
