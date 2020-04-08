/* eslint-disable no-console */
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import express from "express";
import * as path from "path";
import * as React from "react";
import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider, ServerStyleSheets } from "@material-ui/core/styles";
import { I18nextProvider } from "react-i18next";
import middleware from "i18next-express-middleware";
import i18next from "i18next";
import Html from "./components/Html";
import AppShell from "./components/AppShell";
import reducer from "./reducers";
import theme from "./theme";
import i18n from "./i18n";

interface IContext {
  url?: string;
}

i18next.use(middleware.LanguageDetector).init(i18n);

const app = express();
const port = process.env.PORT || 8050;

app.use(middleware.handle(i18next));

app.use("/sw", express.static("dist/sw", { maxAge: "1d" }));
app.use("/data", express.static("dist/data", { maxAge: "7d" }));
app.use("/static", express.static("dist/static", { maxAge: "7d" }));
app.use("/js", express.static("dist/js", { maxAge: "365d" }));
app.use("/img", express.static("dist/img", { maxAge: "365d" }));
app.use("/css", express.static("dist/css", { maxAge: "365d" }));

app.use((req, res) => {
  const context: IContext = {};

  const statsFile = path.resolve("dist/loadable-stats.json");
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["client"] });
  const store = createStore(reducer());
  const sheets = new ServerStyleSheets();

  const component = (
    <ChunkExtractorManager extractor={extractor}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={req.i18n}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <AppShell />
            </StaticRouter>
          </Provider>
        </I18nextProvider>
      </ThemeProvider>
    </ChunkExtractorManager>
  );

  try {
    const body = renderToString(extractor.collectChunks(component));

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url);
      return;
    }

    const scripts = extractor.getScriptTags();
    const styles = extractor.getStyleTags();
    const css = sheets.toString();

    const html = Html({
      body,
      css,
      scripts,
      state: JSON.stringify(store.getState()),
      styles,
    });

    res.set("Cache-Control", "no-cache");
    res.send(html);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error.");
  }
});

app.listen(port, () => console.log(`app Server is now running on http://localhost:${port}`));
