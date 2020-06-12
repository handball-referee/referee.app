import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, useHistory } from "react-router";
import loadable from "@loadable/component";
import {
  AppShell, Loading, Menu, MenuItem, Select, SelectItem,
} from "@handball-referee/widgets";
import {
  faBookOpen, faChartArea, faInfoCircle, faTasks,
} from "@fortawesome/free-solid-svg-icons";
import TestDataProvider from "../context/TestDataProvider";
import About from "./Info";
import Logo from "../static/logo57.png";
import us from "../img/us.svg";
import de from "../img/de.svg";
import es from "../img/es.svg";
import fr from "../img/fr.svg";
import Tracking from "./Tracking";
import useAnalytics from "../hooks/useAnalytics";
import "@handball-referee/widgets/module/colors.css";
import "@handball-referee/widgets/module/styles.css";

const HandballRules = loadable(() => import("./HandballRules"), {
  fallback: <Loading />,
});

const RulesTest = loadable(() => import("./rules-test/RulesTest"), {
  fallback: <Loading />,
});

const Stats = loadable(() => import("./stats/Stats"), {
  fallback: <Loading />,
});

const Shell: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const { listen } = useHistory();
  const { updateConfig, trackEvent } = useAnalytics();

  useEffect(() => listen((location) => {
    updateConfig({
      anonymize_ip: true,
      page_path: location.pathname,
    });
  }), []);

  const handleLanguageChange = async (lang: string) => {
    await i18n.changeLanguage(lang);
    trackEvent("language_change", {
      event_category: "engagement",
      event_label: lang,
    });
  };

  const headerContent = (
    <Select value={i18n.language} onChange={handleLanguageChange} label={t("app.language")}>
      <SelectItem value="en">
        <img src={us} alt="English" />
        <span>English</span>
      </SelectItem>
      <SelectItem value="de">
        <img src={de} alt="Deutsch" />
        <span>Deutsch</span>
      </SelectItem>
      <SelectItem value="fr">
        <img src={fr} alt="Français" />
        <span>Français</span>
      </SelectItem>
      <SelectItem value="es">
        <img src={es} alt="Español" />
        <span>Español</span>
      </SelectItem>
    </Select>
  );

  const menu = (
    <Menu>
      <MenuItem to="/" exact icon={faTasks} text={t("menu.test")} />
      <MenuItem to="/rules" exact icon={faBookOpen} text={t("menu.rules")} />
      <MenuItem to="/stats" exact icon={faChartArea} text={t("menu.stats")} />
      <MenuItem to="/about" exact icon={faInfoCircle} text={t("menu.about")} />
    </Menu>
  );

  return (
    <AppShell
      title={t("app.title")}
      logo={Logo}
      menu={menu}
      headerContent={headerContent}
      toggleText={t("app.toggle-menu")}
    >
      <Tracking />
      <TestDataProvider>
        <Route path="/" component={RulesTest} exact />
        <Route path="/rules" component={HandballRules} />
        <Route path="/stats" component={Stats} />
        <Route path="/about" component={About} />
      </TestDataProvider>
    </AppShell>
  );
};

export default Shell;
