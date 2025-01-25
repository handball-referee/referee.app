import React from "react";
import { useTranslation } from "react-i18next";
import useScrollToAnchor from "../../../hooks/useScrollToAnchor";
import foreword from "../../../data/pl/Foreword.md";
import rule1 from "../../../data/pl/1.md";
import rule2 from "../../../data/pl/2.md";
import rule3 from "../../../data/pl/3.md";
import rule4 from "../../../data/pl/4.md";
import rule5 from "../../../data/pl/5.md";
import rule6 from "../../../data/pl/6.md";
import rule7 from "../../../data/pl/7.md";
import rule8 from "../../../data/pl/8.md";
import rule9 from "../../../data/pl/9.md";
import rule10 from "../../../data/pl/10.md";
import rule11 from "../../../data/pl/11.md";
import rule12 from "../../../data/pl/12.md";
import rule13 from "../../../data/pl/13.md";
import rule14 from "../../../data/pl/14.md";
import rule15 from "../../../data/pl/15.md";
import rule16 from "../../../data/pl/16.md";
import rule17 from "../../../data/pl/17.md";
import rule18 from "../../../data/pl/18.md";
import handSignals from "../../../data/pl/HandSignals.md";
import clarification1 from "../../../data/pl/Clarification1.md";
import clarification2 from "../../../data/pl/Clarification2.md";
import clarification3 from "../../../data/pl/Clarification3.md";
import clarification4 from "../../../data/pl/Clarification4.md";
import clarification5 from "../../../data/pl/Clarification5.md";
import clarification6 from "../../../data/pl/Clarification6.md";
import clarification7 from "../../../data/pl/Clarification7.md";
import clarification8 from "../../../data/pl/Clarification8.md";
import sar from "../../../data/pl/SAR.md";
import guidelines from "../../../data/pl/Guidelines.md";
import newGuidelines from "../../../data/pl/NewGuidelines.md";
import playingCourt from "../../../data/pl/GuidelinesPlayingCourts.md";

const Polish = () => {
  const { t } = useTranslation();
  useScrollToAnchor();

  const text = `
    ${foreword}
    <h1 id="rules-of-the-game">${t("rules.rules")}</h1>
    ${rule1}
    ${rule2}
    ${rule3}
    ${rule4}
    ${rule5}
    ${rule6}
    ${rule7}
    ${rule8}
    ${rule9}
    ${rule10}
    ${rule11}
    ${rule12}
    ${rule13}
    ${rule14}
    ${rule15}
    ${rule16}
    ${rule17}
    ${rule18}
    ${handSignals}
    <h1 id="clarifications-to-the-rules-of-the-game">${t("rules.clarifications")}</h1>
    ${clarification1}
    ${clarification2}
    ${clarification3}
    ${clarification4}
    ${clarification5}
    ${clarification6}
    ${clarification7}
    ${clarification8}
    ${sar}
    ${guidelines}
    ${newGuidelines}
    ${playingCourt}
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: text }} />
  );
};

export default Polish;
