import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Item from "./Item";

interface RuleItemProps {
  textKey: string;
  className?: string;
}

const RulesItem: FunctionComponent<RuleItemProps> = ({ textKey, className }) => {
  const { t } = useTranslation();
  const name = t(textKey);
  const href = name.toLowerCase().replace(/\s/g, "-").replace(/,/g, "");
  return (
    <Item<string> code={textKey} className={className}>
      <a href={`#${href}`} className="block text-black py-1 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis no-underline">
        {name}
      </a>
    </Item>
  );
};

const RulesSelector: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleTogglePopup = () => {
    setOpen(!open);
  };

  const className = classNames("relative flex rounded-lg border md:border-0 border-blue-500 w-full h-8 md:h-full m-3 md:m-0 box-border", {
    "rounded-b-none": open,
  });
  const popupClassName = classNames("md:block list-none absolute md:relative bg-grey-200 top-8 md:top-0 right-0 border md:border-0 border-blue-500 mt-[-2px] mr-[-1px] w-full max-h-60 md:max-h-none md:h-full z-10 overflow-scroll", {
    block: open,
    hidden: !open,
  });

  return (
    <aside id="rules-selector-wrapper" className="bg-grey-200 shadow flex flex-grow-0 shrink-0 basis-14 md:basis-60 md:overflow-auto">
      <div
        className={className}
        role="listbox"
        tabIndex={0}
        onClick={handleTogglePopup}
      >
        <div className="block flex-grow p-1 md:hidden">
          {t("app.quicknav")}
        </div>
        <div id="selector-indicator" className="flex md:hidden text-2xl w-4 my-1 mx-2">
          <FontAwesomeIcon icon={faAngleDown} className="block" />
        </div>
        <ul id="selector-popup" className={popupClassName}>
          <RulesItem textKey="rules.foreword" />
          <RulesItem textKey="rules.rules" />
          <RulesItem textKey="rules.rule.rule1" className="pl-6" />
          <RulesItem textKey="rules.rule.rule2" className="pl-6" />
          <RulesItem textKey="rules.rule.rule3" className="pl-6" />
          <RulesItem textKey="rules.rule.rule4" className="pl-6" />
          <RulesItem textKey="rules.rule.rule5" className="pl-6" />
          <RulesItem textKey="rules.rule.rule6" className="pl-6" />
          <RulesItem textKey="rules.rule.rule7" className="pl-6" />
          <RulesItem textKey="rules.rule.rule8" className="pl-6" />
          <RulesItem textKey="rules.rule.rule9" className="pl-6" />
          <RulesItem textKey="rules.rule.rule10" className="pl-6" />
          <RulesItem textKey="rules.rule.rule11" className="pl-6" />
          <RulesItem textKey="rules.rule.rule12" className="pl-6" />
          <RulesItem textKey="rules.rule.rule13" className="pl-6" />
          <RulesItem textKey="rules.rule.rule14" className="pl-6" />
          <RulesItem textKey="rules.rule.rule15" className="pl-6" />
          <RulesItem textKey="rules.rule.rule16" className="pl-6" />
          <RulesItem textKey="rules.rule.rule17" className="pl-6" />
          <RulesItem textKey="rules.rule.rule18" className="pl-6" />
          <RulesItem textKey="rules.hand-signals" />
          <RulesItem textKey="rules.clarifications" />
          <RulesItem textKey="rules.sar" />
          <RulesItem textKey="rules.guidelines" />
          <RulesItem textKey="rules.new-guidelines" />
          <RulesItem textKey="rules.playing-court" />
        </ul>
      </div>
    </aside>
  );
};

export default RulesSelector;
