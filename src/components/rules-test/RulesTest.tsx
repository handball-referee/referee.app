/* eslint-disable no-mixed-operators */
import React, { FunctionComponent, useState, MouseEvent } from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { faChartPie, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRulesTestData } from "../../context/TestDataContext";
import CheckBox from "../CheckBox";
import useAnalytics from "../../hooks/useAnalytics";
import RelevantRules from "./RelevantRules";
import VersionPicker from "../VersionPicker";
import Item from "../Item";

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
    const className = classnames("flex shadow p-4", {
      'bg-green-100': reveal && isCorrect === isChecked,
      'bg-red-100': reveal && isCorrect !== isChecked,
      'bg-white': !reveal
    });

    return (
      <div key={key} className={className}>
        <div className="flex flex-shrink-0 basis-8">
          <CheckBox
            checked={isChecked}
            onChange={() => updateChecked(key)}
            labelledBy={`test-option-${key}`}
          />
        </div>
        <div id={`test-option-${key}`} className="flex-grow">
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
      <div className="flex justify-between px-4 py-2 bg-white">
        <div className="my-2">
          <FontAwesomeIcon icon={faChartPie} className="mr-4 text-blue-400" />
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
        <div className="flex px-4 py-4 bg-red-200 text-white">
          <FontAwesomeIcon icon={faCircleExclamation} className="mr-4"/>
          <span>{`${t("rulestest.language-missing")}`}</span>
        </div>
      )}
      <form className="overflow-auto p-4">
        <div>
          <h2 className="text-white p-2 bg-blue-300 inline-block shadow">
            {`${t("rulestest.question")} ${question.id}`}
          </h2>
          <div className="bg-white shadow p-4">
            {question.question[languageMissing ? "en" : language]}
          </div>
        </div>
        <div className="mt-4">
          {options}
        </div>
        {relevantRules}
        <button type="submit" className="bg-blue-400 border border-blue-500 text-white mt-4 text-base py-1 px-2 cursor-pointer hover:bg-blue-500" onClick={handleButtonClick}>{buttonText}</button>
      </form>
    </>
  );
};

export default RulesTest;
