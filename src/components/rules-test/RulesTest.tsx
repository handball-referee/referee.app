/* eslint-disable no-mixed-operators */
import React, { FunctionComponent, useState, MouseEvent } from "react";
import classnames from "classnames";
import "./RulesTest.css";
import { useTranslation } from "react-i18next";
import { faChartPie, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRulesTestData } from "../../context/TestDataContext";
import CheckBox from "../CheckBox";
import useAnalytics from "../../hooks/useAnalytics";
import RelevantRules from "./RelevantRules";
import VersionPicker from "../VersionPicker";
import Item from "../Item";
import us from "../../img/us.svg";
import de from "../../img/de.svg";

const RulesTest: FunctionComponent = () => {
  const {
    question,
    nextQuestion,
    checkAnswers,
    asked: numAsked,
    correct: numCorrect,
    checked: initialChecked,
    reveal,
    languageMissing,
  } = useRulesTestData();
  const [checked, setChecked] = useState<string[]>(initialChecked);

  const { t, i18n: { language } } = useTranslation();
  const { trackEvent } = useAnalytics();

  const handleButtonClick = async (event: MouseEvent) => {
    event.preventDefault();

    if (!nextQuestion || !checkAnswers) {
      return;
    }

    if (!reveal) {
      const response = await checkAnswers(checked);
      trackEvent("answer", {
        event_category: "test",
        event_label: question?.id,
        value: response.answeredCorrect ? 1 : 0,
      });
    } else {
      nextQuestion();
      setChecked([]);

      trackEvent("next_question", {
        event_category: "engagement",
      });
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

  const answers = question.answers[languageMissing ? "en" : language] || [];
  const options = Object.keys(answers).map((key) => {
    const isCorrect = question.correct.includes(key);
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
          {question?.answers[languageMissing ? "en" : language][key]}
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
      <RelevantRules question={question} />
    );
  }

  return (
    <>
      <div id="test-header">
        <div id="test-header-text">
          <FontAwesomeIcon icon={faChartPie} />
          <span>{`${t("rulestest.overall")} ${numCorrect}/${numAsked} (${percentOverall}%)`}</span>
          <span> - </span>
          <span>{`${t("rulestest.question")} ${question.numCorrect}/${question.numAsked} (${percentQuestion}%)`}</span>
        </div>
        <VersionPicker>
          <Item code="ihf_05_2024">
            <span>2024</span>
          </Item>
          <Item code="ihf_08_2019">
            <span>2019</span>
          </Item>
        </VersionPicker>
      </div>
      { languageMissing && (
        <div id="error-message">
          <FontAwesomeIcon icon={faCircleExclamation}/>
          <span>{`${t("rulestest.language-missing")}`}</span>
        </div>
      )}
      <form id="test-content">
        <div id="test-question" className="box-with-header">
          <h2>
            {`${t("rulestest.question")} ${question.id}`}
          </h2>
          <div>
            {question.question[languageMissing ? "en" : language]}
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
