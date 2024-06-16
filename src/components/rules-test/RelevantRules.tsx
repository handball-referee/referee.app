import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Question from "../../model/Question";
import mapRuleToAnchor from "../../utils/mapRuleToAnchor";

interface Props {
  question: Question;
}

const RelevantRules: FunctionComponent<Props> = ({ question }) => {
  const { t, i18n: { language } } = useTranslation();
  return (
    <div id="relevant-rules" className="mt-4">
      <h2 className="text-white p-2 bg-blue-300 inline-block shadow">
        {t("rulestest.relevant-rules")}
      </h2>
      {question.rules.map((rule) => (
        <div key={rule} className="bg-white shadow p-4 underline">
          <Link className="text-black" to={`/rules${mapRuleToAnchor(rule, language)}`}>{rule}</Link>
        </div>
      ))}
    </div>
  );
};

export default RelevantRules;
