/* eslint-disable no-mixed-operators */
import React, { FunctionComponent, KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { faChevronDown, faChevronRight, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Question from "../../model/Question";
import CheckBox from "../CheckBox";
import {useRulesTestData} from "../../context/TestDataContext";

interface Props {
  question: Question;
}

const QuestionComponent: FunctionComponent<Props> = ({ question }) => {
  const [open, setOpen] = useState(false);
  const { i18n: { language } } = useTranslation();
  const { languageMissing } = useRulesTestData();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      setOpen(!open);
    } else {
      return;
    }

    event.preventDefault();
  };

  const percent = question.numAsked
    ? Math.round(100 / question.numAsked * question.numCorrect)
    : 0;
  let color = "bg-red-100 text-white";
  if (question.numAsked === 0) {
    color = "bg-grey-300 text-grey-400";
  } else if (percent >= 80) {
    color = "bg-green-400 text-white";
  } else if (percent >= 50) {
    color = "bg-orange-100 text-white";
  }

  let icon;
  let content;
  if (open) {
    icon = faChevronDown;

    const answers = question.answers[languageMissing ? 'en' : language] || [];
    const options = Object.keys(answers).map((key) => {
      const isChecked = question.correct.includes(key);

      return (
        <React.Fragment key={key}>
          <div className="px-2 py-1">
            <CheckBox
              checked={isChecked}
              labelledBy={`test-option-${key}`}
              readOnly
            />
          </div>
          <div className="px-2 py-1">
            {question?.answers[languageMissing ? 'en' : language][key]}
          </div>
        </React.Fragment>
      );
    });

    content = (
      <div className="content p-2 [grid-area:content]">
        <div className="p-2">
          {question.question[languageMissing ? 'en' : language]}
        </div>
        <div className="grid grid-cols-[2rem_auto] grid-rows-[auto]">
          {options}
        </div>
      </div>
    );
  } else {
    icon = faChevronRight;
  }

  return (
    <div
      key={question.id}
      className="bg-white shadow grid text-base grid-cols-[2rem_auto_4rem_7rem] grid-rows-[auto] [grid-template-areas:'icon_number_box_result''content_content_content_content']"
      role="switch"
      aria-checked={open}
      tabIndex={0}
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
    >
      <FontAwesomeIcon className="p-2 self-center text-blue-100 [grid-area:icon]" icon={icon} size="lg" />
      <div className="p-2 self-center [grid-area:number]">
        {question.id}
      </div>
      <div className="p-2 justify-self-center">
        <FontAwesomeIcon className="mr-2 text-sm" icon={faFolderOpen} size="lg" />
        <span className="text-base">{question.box}</span>
      </div>
      <div className={`p-2 text-center ${color} [grid-area:result]`}>{`${question.numCorrect} / ${question.numAsked} (${percent}%)`}</div>
      {content}
    </div>
  );
};

export default QuestionComponent;
