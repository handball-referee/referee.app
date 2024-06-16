/* eslint-disable no-mixed-operators */
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import QuestionComponent from "./Question";
import Question from "../../model/Question";

interface Props {
  id: string;
  asked: number;
  correct: number;
  questions: Question[];
}

const Rule: FunctionComponent<Props> = ({
  id, asked, correct, questions,
}) => {
  const { t } = useTranslation();

  let key;
  if (id === "SAR") {
    key = "rules.sar";
  } else {
    key = `rules.rule.rule${id}`;
  }

  const percent = asked ? Math.round(100 / asked * correct) : 0;
  let color = "bg-red-100 text-white";
  if (!asked) {
    color = "bg-grey-300 text-grey-400";
  } else if (percent >= 80) {
    color = "bg-green-300 text-white";
  } else if (percent >= 50) {
    color = "bg-orange-100 text-white";
  }

  const details = questions.map((question) => (
    <QuestionComponent key={question.id} question={question} />
  ));

  return (
    <div className="mx-4 mt-4">
      <div className="blocks md:flex justify-between">
        <h2 className="bg-blue-400 p-2 font-bold text-white text-base">{t(key)}</h2>
        <div className={`text-base p-2 ${color}`}>{`${correct} / ${asked} (${percent}%)`}</div>
      </div>
      <div className="rule-stat-content">
        {details}
      </div>
    </div>
  );
};

export default Rule;
