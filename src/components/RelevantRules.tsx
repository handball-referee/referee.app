import React, { FunctionComponent } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { WithTranslation, withTranslation } from "react-i18next";
import {
  Clarification1, Clarification2, Clarification3,
  Clarification4, Clarification5, Clarification6,
  Clarification7, Clarification8, HandSignals,
  Rule1, Rule10, Rule11,
  Rule12, Rule13, Rule14,
  Rule15, Rule16, Rule17,
  Rule18, Rule2, Rule3,
  Rule4, Rule5, Rule6,
  Rule7, Rule8, Rule9,
} from "./rules/Rules";

interface RuleSwitchProps extends WithTranslation {
  rule: string;
}

const RuleSwitchComponent: FunctionComponent<RuleSwitchProps> = ({ rule, i18n }) => {
  const res = rule.match(/^([0-9]{1,2}):[0-9]{1,2}/);
  const lang = i18n.language;

  if (res) {
    switch (res[1]) {
      case "1":
        return <Rule1 lang={lang} />;
      case "2":
        return <Rule2 lang={lang} />;
      case "3":
        return <Rule3 lang={lang} />;
      case "4":
        return <Rule4 lang={lang} />;
      case "5":
        return <Rule5 lang={lang} />;
      case "6":
        return <Rule6 lang={lang} />;
      case "7":
        return <Rule7 lang={lang} />;
      case "8":
        return <Rule8 lang={lang} />;
      case "9":
        return <Rule9 lang={lang} />;
      case "10":
        return <Rule10 lang={lang} />;
      case "11":
        return <Rule11 lang={lang} />;
      case "12":
        return <Rule12 lang={lang} />;
      case "13":
        return <Rule13 lang={lang} />;
      case "14":
        return <Rule14 lang={lang} />;
      case "15":
        return <Rule15 lang={lang} />;
      case "16":
        return <Rule16 lang={lang} />;
      case "17":
        return <Rule17 lang={lang} />;
      case "18":
        return <Rule18 lang={lang} />;
      // no default
    }
  }

  const cla = rule.match(/^Clarification ([0-9])/);

  if (cla) {
    switch (cla[1]) {
      case "1":
        return <Clarification1 lang={lang} />;
      case "2":
        return <Clarification2 lang={lang} />;
      case "3":
        return <Clarification3 lang={lang} />;
      case "4":
        return <Clarification4 lang={lang} />;
      case "5":
        return <Clarification5 lang={lang} />;
      case "6":
        return <Clarification6 lang={lang} />;
      case "7":
        return <Clarification7 lang={lang} />;
      case "8":
        return <Clarification8 lang={lang} />;
      // no default
    }
  }

  if (rule === "Hand Signals") {
    return <HandSignals lang={lang} />;
  }

  return (<Typography>Rule Text not found</Typography>);
};

const RuleSwitchComponentT = withTranslation()(RuleSwitchComponent);

interface Props {
  rules: string[];
}

const RelevantRules: FunctionComponent<Props> = ({ rules }) => {
  if (!rules || !Array.isArray(rules)) {
    return (<div />);
  }

  return (
    <div>
      {rules.map(rule => (
        <ExpansionPanel key={rule}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{rule}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RuleSwitchComponentT rule={rule} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default RelevantRules;
