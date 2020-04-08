import React, { FunctionComponent } from "react";
import { Route, RouteComponentProps } from "react-router";
import Paper from "@material-ui/core/Paper";
import {
  WithStyles, createStyles, withStyles, Theme,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { WithTranslation, useTranslation, withTranslation } from "react-i18next";
import {
  Clarification1,
  Clarification2,
  Clarification3,
  Clarification4,
  Clarification5,
  Clarification6,
  Clarification7,
  Clarification8,
  Foreword,
  Guidelines,
  GuidelinesPlayingCourt,
  HandSignals,
  Rule1, Rule10, Rule11,
  Rule12, Rule13, Rule14,
  Rule15, Rule16, Rule17,
  Rule18, Rule2, Rule3,
  Rule4, Rule5, Rule6,
  Rule7, Rule8, Rule9,
  SAR,
} from "./rules/Rules";

const ForewordComponent = () => {
  const { i18n } = useTranslation();

  return (<Foreword lang={i18n.language} />);
};

const RulesOfTheGameComponent = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div>
      <Typography variant="h6">{t("Rules of the Game")}</Typography>
      <Rule1 lang={lang} />
      <Rule2 lang={lang} />
      <Rule3 lang={lang} />
      <Rule4 lang={lang} />
      <Rule5 lang={lang} />
      <Rule6 lang={lang} />
      <Rule7 lang={lang} />
      <Rule8 lang={lang} />
      <Rule9 lang={lang} />
      <Rule10 lang={lang} />
      <Rule11 lang={lang} />
      <Rule12 lang={lang} />
      <Rule13 lang={lang} />
      <Rule14 lang={lang} />
      <Rule15 lang={lang} />
      <Rule16 lang={lang} />
      <Rule17 lang={lang} />
      <Rule18 lang={lang} />
    </div>
  );
};

const HandSignalsComponent = () => {
  const { i18n } = useTranslation();
  return (<HandSignals lang={i18n.language} />);
};

const ClarificationsComponent = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div>
      <Typography variant="h6">{t("Clarifications to the Rules of the Game")}</Typography>
      <Clarification1 lang={lang} />
      <Clarification2 lang={lang} />
      <Clarification3 lang={lang} />
      <Clarification4 lang={lang} />
      <Clarification5 lang={lang} />
      <Clarification6 lang={lang} />
      <Clarification7 lang={lang} />
      <Clarification8 lang={lang} />
    </div>
  );
};

const SubstitutionAreaRegulationsComponent = () => {
  const { i18n } = useTranslation();
  return (<SAR lang={i18n.language} />);
};

const GuidelinesComponent = () => {
  const { i18n } = useTranslation();
  return (<Guidelines lang={i18n.language} />);
};

const CourtAndGoalComponent = () => {
  const { i18n } = useTranslation();
  return (<GuidelinesPlayingCourt lang={i18n.language} />);
};

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(3),
  },
});

interface Props extends WithTranslation, WithStyles<typeof styles>, RouteComponentProps {

}

const HandballRules: FunctionComponent<Props> = ({ classes, match, t }) => (
  <Paper className={classes.root}>
    <Route path={`${match.url}/foreword`} component={ForewordComponent} />
    <Route path={`${match.url}/rules-of-the-game`} component={RulesOfTheGameComponent} />
    <Route path={`${match.url}/hand-signals`} component={HandSignalsComponent} />
    <Route path={`${match.url}/clarifications`} component={ClarificationsComponent} />
    <Route path={`${match.url}/substitution-area-regulations`} component={SubstitutionAreaRegulationsComponent} />
    <Route path={`${match.url}/guidelines-and-interpretations`} component={GuidelinesComponent} />
    <Route path={`${match.url}/guidelines-for-playing-courts-and-goals`} component={CourtAndGoalComponent} />
    <Typography color="textSecondary">{t("EDITION")}</Typography>
    <Typography color="textSecondary">{t("SOURCE")}</Typography>
  </Paper>
);

export default withStyles(styles)(withTranslation()(HandballRules));
