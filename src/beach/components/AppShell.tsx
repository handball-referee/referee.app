import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, useHistory } from "react-router";
import loadable from "@loadable/component";
import Menu from "../../core/components/Menu";
import Loading from "../../core/components/Loading";
import "./AppShell.css";
import TestDataProvider from "../../core/context/TestDataProvider";
import About from "../../core/components/Info";
import Tracking from "../../core/components/Tracking";
import useAnalytics from "../../core/hooks/useAnalytics";
import Logo from "../static/logo57.png";
import answerData from "../data/answers.json";
import mapRuleToAnchor from "../utils/mapRuleToAnchor";
import LanguagePicker from "../../core/components/LanguagePicker";
import Item from "../../core/components/Item";
import us from "../../img/us.svg";
import es from "../../img/es.svg";
import de from "../../img/de.svg";

const HandballRules = loadable(() => import("./HandballRules"), {
  fallback: <Loading />,
});

const RulesTest = loadable(() => import("../../core/components/rules-test/RulesTest"), {
  fallback: <Loading />,
});

const BeachRulesTest = () => {
  return (
    <RulesTest mapRuleToAnchor={mapRuleToAnchor} />
  );
}

const Stats = loadable(() => import("../../core/components/stats/Stats"), {
  fallback: <Loading />,
});

const AppShell: FunctionComponent = () => {
  const { t } = useTranslation();
  const { listen } = useHistory();
  const { updateConfig } = useAnalytics();

  useEffect(() => listen((location) => {
    updateConfig({
      anonymize_ip: true,
      page_path: location.pathname,
    });
  }), []);

  return (
    <div id="page-wrapper">
      <Menu logo={Logo} link="https://usabeachtour.online/" />
      <div id="page-body">
        <Tracking />
        <header>
          <h1>{t("app.title")}</h1>
          <LanguagePicker>
            <Item code="en">
              <img src={us} alt="English" />
              <span>English</span>
            </Item>
            <Item code="es">
              <img src={es} alt="Español" />
              <span>Español</span>
            </Item>
            <Item code="de">
              <img src={de} alt="Deutsch" />
              <span>Deutsch</span>
            </Item>
          </LanguagePicker>
        </header>
        <TestDataProvider answerData={answerData}>
          <Route path="/" exact render={BeachRulesTest} />
          <Route path="/rules" component={HandballRules} />
          <Route path="/stats" component={Stats} />
          <Route path="/about" component={About} />
        </TestDataProvider>
      </div>
    </div>
  );
};

export default AppShell;
