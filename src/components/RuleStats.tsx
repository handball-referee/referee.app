/* eslint-disable no-mixed-operators */
import React, { FunctionComponent } from "react";
import "./RuleStats.css";
import { useTranslation } from "react-i18next";
import Question from "../model/Question";

interface Props {
  id: string;
  asked: number;
  correct: number;
  questions: Question[];
}

const RuleStats: FunctionComponent<Props> = ({
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
  let color = "bad";
  if (!asked) {
    color = "empty";
  } else if (percent >= 80) {
    color = "good";
  } else if (percent >= 50) {
    color = "ok";
  }

  const details = questions.map((question) => {
    const questionPercent = question.numAsked
      ? Math.round(100 / question.numAsked * question.numCorrect)
      : 0;
    let questionColor = "bad";
    if (question.numAsked === 0) {
      questionColor = "empty";
    } else if (questionPercent >= 80) {
      questionColor = "good";
    } else if (questionPercent >= 50) {
      questionColor = "ok";
    }

    return (
      <div key={question.id} className="stat-question">
        <div className="stat-question-id">
          {question.id}
        </div>
        <div className={`stat-question-stats ${questionColor}`}>{`${question.numCorrect} / ${question.numAsked} (${questionPercent}%)`}</div>
      </div>
    );
  });

  return (
    <div className="rule-stat-box">
      <div className="rule-stat-header">
        <h2 className="rule-stat-title">{t(key)}</h2>
        <div className={`rule-stat-stats ${color}`}>{`${correct} / ${asked} (${percent}%)`}</div>
      </div>
      <div className="rule-stat-content">
        {details}
      </div>
    </div>
  );
};

export default RuleStats;
