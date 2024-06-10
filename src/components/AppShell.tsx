import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router";
import loadable from "@loadable/component";
import Menu from "./Menu";
import Loading from "./Loading";
import "./AppShell.css";
import LanguagePicker from "./LanguagePicker";
import Item from "./Item";
import TestDataProvider from "../context/TestDataProvider";
import About from "./Info";
import us from "../img/us.svg";
import de from "../img/de.svg";
import es from "../img/es.svg";
import fr from "../img/fr.svg";
import Tracking from "./Tracking";
import useAnalytics from "../hooks/useAnalytics";

const HandballRules = loadable(() => import("./HandballRules"), {
  fallback: <Loading />,
});

const RulesTest = loadable(() => import("./rules-test/RulesTest"), {
  fallback: <Loading />,
});

const Stats = loadable(() => import("./stats/Stats"), {
  fallback: <Loading />,
});

const AppShell: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { updateConfig } = useAnalytics();

  useEffect(() => {
    updateConfig({
      anonymize_ip: true,
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <div id="page-wrapper">
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <Menu />
      <div id="page-body">
        <Tracking />
        <header>
          <h1>{t("app.title")}</h1>
          <LanguagePicker>
            <Item code="en">
              <img src={us} alt="English" />
              <span>English</span>
            </Item>
            <Item code="de">
              <img src={de} alt="Deutsch" />
              <span>Deutsch</span>
            </Item>
            <Item code="fr">
              <img src={fr} alt="Français" />
              <span>Français</span>
            </Item>
            <Item code="es">
              <img src={es} alt="Español" />
              <span>Español</span>
            </Item>
          </LanguagePicker>
        </header>
        <TestDataProvider>
          <Routes>
            <Route index element={<RulesTest />} />
            <Route path="rules" element={<HandballRules />} />
            <Route path="stats" element={<Stats />} />
            <Route path="about" element={<About />} />
          </Routes>
        </TestDataProvider>
      </div>
    </div>
  );
};

export default AppShell;
