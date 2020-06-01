import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Question from "../../model/Question";
import mapRuleToAnchor from "../../utils/mapRuleToAnchor";
import "./RelevantRules.css";

interface Props {
  question: Question;
}

const RelevantRules: FunctionComponent<Props> = ({ question }) => {
  const { t, i18n: { language } } = useTranslation();
  return (
    <div id="relevant-rules" className="box-with-header">
      <h2>
        {t("rulestest.relevant-rules")}
      </h2>
      {question.rules.map((rule) => (
        <div key={rule}>
          <Link to={`/rules${mapRuleToAnchor(rule, language)}`}>{rule}</Link>
        </div>
      ))}
    </div>
  );
};

export default RelevantRules;
