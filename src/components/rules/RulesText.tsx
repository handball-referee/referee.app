import React from "react";
import loadable from "@loadable/component";
import { Loading } from "@handball-referee/widgets";
import { useTranslation } from "react-i18next";
import "./RulesText.css";

interface Props {
  lang: string;
}

const Rules = loadable<Props>((props) => import(`./${props.lang}/Rules`), {
  fallback: <Loading />,
});

const RulesText = () => {
  const { t, i18n } = useTranslation();
  return (
    <div id="rules-text">
      <div id="rules-source">
        <div>{t("rules.edition")}</div>
        <div>{t("rules.source")}</div>
      </div>
      <Rules lang={i18n.language} />
    </div>
  );
};

export default RulesText;
