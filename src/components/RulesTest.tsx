/* eslint-disable no-mixed-operators */
import React, { FunctionComponent, useState, MouseEvent } from "react";
import classnames from "classnames";
import "./RulesTest.css";
import { useTranslation } from "react-i18next";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRulesTestData } from "./TestDataContext";
import CheckBox from "./CheckBox";

const RulesTest: FunctionComponent = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [reveal, setReveal] = useState(false);
  const [correct, setCorrect] = useState<string[]>([]);
  const [rules, setRules] = useState<string[]>([]);
  const {
    question, nextQuestion, checkAnswers, asked: numAsked, correct: numCorrect,
  } = useRulesTestData();
  const { t, i18n: { language } } = useTranslation();

  const handleButtonClick = async (event: MouseEvent) => {
    event.preventDefault();

    if (!nextQuestion || !checkAnswers) {
      return;
    }

    if (!reveal) {
      const response = await checkAnswers(checked);
      setReveal(true);
      setCorrect(response.correct);
      setRules(response.rules);
    } else {
      nextQuestion();

      setChecked([]);
      setCorrect([]);
      setRules([]);
      setReveal(false);
    }
  };

  const updateChecked = (key: string) => {
    if (reveal) {
      return;
    }

    const currentChecked = [...checked];
    const index = currentChecked.indexOf(key);
    if (index > -1) {
      currentChecked.splice(index, 1);
    } else {
      currentChecked.push(key);
    }
    currentChecked.sort();
    setChecked(currentChecked);
  };

  if (!question) {
    return <div>No more question</div>;
  }

  const answers = question.answers[language] || [];
  const options = Object.keys(answers).map((key) => {
    const isCorrect = correct.includes(key);
    const isChecked = checked.includes(key);
    const className = classnames("option", {
      correct: reveal && isCorrect === isChecked,
      wrong: reveal && isCorrect !== isChecked,
    });

    return (
      <div key={key} className={className}>
        <div className="check">
          <CheckBox
            checked={isChecked}
            onChange={() => updateChecked(key)}
            labelledBy={`test-option-${key}`}
          />
        </div>
        <div id={`test-option-${key}`} className="text">
          {question?.answers[language][key]}
        </div>
      </div>
    );
  });

  const buttonText = reveal ? t("rulestest.next") : t("rulestest.check");
  const percentOverall = numAsked ? Math.round(100 / numAsked * numCorrect) : 0;
  const percentQuestion = question.numAsked
    ? Math.round(100 / question.numAsked * question.numCorrect) : 0;

  let relevantRules;
  if (reveal) {
    relevantRules = (
      <div id="relevant-rules" className="box-with-header">
        <h2>
          {t("rulestest.relevant-rules")}
        </h2>
        {rules.map((rule) => (
          <div key={rule}>{rule}</div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div id="test-header">
        <FontAwesomeIcon icon={faChartPie} />
        <span>{`${t("rulestest.overall")} ${numCorrect}/${numAsked} (${percentOverall}%)`}</span>
        <span> - </span>
        <span>{`${t("rulestest.question")} ${question.numCorrect}/${question.numAsked} (${percentQuestion}%)`}</span>
      </div>
      <form id="test-content">
        <div id="test-question" className="box-with-header">
          <h2>
            {`${t("rulestest.question")} ${question.id}`}
          </h2>
          <div>
            {question.question[language]}
          </div>
        </div>
        <div id="test-options">
          {options}
        </div>
        {relevantRules}
        <button type="submit" onClick={handleButtonClick}>{buttonText}</button>
      </form>
    </>
  );
};

export default RulesTest;
