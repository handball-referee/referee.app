import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Route, Routes, useLocation } from "react-router";
import loadable from "@loadable/component";
import Menu from "./Menu";
import Loading from "./Loading";
import LanguagePicker from "./LanguagePicker";
import TestDataProvider from "../context/TestDataProvider";
import About from "./Info";
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
    <div id="page-wrapper" className="font-sans flex fixed top-0 bottom-0 left-0 right-0 bg-grey-100 flex-col-reverse md:flex-row">
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <Menu />
      <div id="page-body" className="flex flex-col flex-grow overflow-auto">
        <Tracking />
        <header className="flex bg-blue-300 shadow basis-14">
          <h1 className="mx-4 mt-4 mb-3 text-white text-xl grow">{t("app.title")}</h1>
          <LanguagePicker />
        </header>
        <TestDataProvider>
          <Routes>
            <Route index element={<RulesTest />} />
            {/* <Route path="rules" element={<HandballRules />} /> */}
            <Route path="stats" element={<Stats />} />
            <Route path="about" element={<About />} />
          </Routes>
        </TestDataProvider>
      </div>
    </div>
  );
};

export default AppShell;
