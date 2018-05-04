import React from 'react';
import { Route } from 'react-router';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Rule from './Rule';
import Foreword from '../data/rules/Foreword.md';
import Rule1 from '../data/rules/1.md';
import Rule2 from '../data/rules/2.md';
import Rule3 from '../data/rules/3.md';
import Rule4 from '../data/rules/4.md';
import Rule5 from '../data/rules/5.md';
import Rule6 from '../data/rules/6.md';
import Rule7 from '../data/rules/7.md';
import Rule8 from '../data/rules/8.md';
import Rule9 from '../data/rules/9.md';
import Rule10 from '../data/rules/10.md';
import Rule11 from '../data/rules/11.md';
import Rule12 from '../data/rules/12.md';
import Rule13 from '../data/rules/13.md';
import Rule14 from '../data/rules/14.md';
import Rule15 from '../data/rules/15.md';
import Rule16 from '../data/rules/16.md';
import Rule17 from '../data/rules/17.md';
import Rule18 from '../data/rules/18.md';
import HandSignals from '../data/rules/HandSignals.md';
import Clarifications1 from '../data/rules/Clarification1.md';
import Clarifications2 from '../data/rules/Clarification2.md';
import Clarifications3 from '../data/rules/Clarification3.md';
import Clarifications4 from '../data/rules/Clarification4.md';
import Clarifications5 from '../data/rules/Clarification5.md';
import Clarifications6 from '../data/rules/Clarification6.md';
import Clarifications7 from '../data/rules/Clarification7.md';
import Clarifications8 from '../data/rules/Clarification8.md';
import SAR from '../data/rules/SAR.md';
import Guidelines from '../data/rules/Guidelines.md';
import GuidelinesPlayingCourts from '../data/rules/GuidelinesPlayingCourts.md';

const ForwordComponent = () => (<Rule source={Foreword}/>);
const RulesOfTheGameComponent = () => (<div>
  <Typography variant="title">Rules of the Game</Typography>
  <Rule source={Rule1}/>
  <Rule source={Rule2}/>
  <Rule source={Rule3}/>
  <Rule source={Rule4}/>
  <Rule source={Rule5}/>
  <Rule source={Rule6}/>
  <Rule source={Rule7}/>
  <Rule source={Rule8}/>
  <Rule source={Rule9}/>
  <Rule source={Rule10}/>
  <Rule source={Rule11}/>
  <Rule source={Rule12}/>
  <Rule source={Rule13}/>
  <Rule source={Rule14}/>
  <Rule source={Rule15}/>
  <Rule source={Rule16}/>
  <Rule source={Rule17}/>
  <Rule source={Rule18}/>
</div>);
const HandSignalsComponent = () => (<Rule source={HandSignals}/>);
const ClarificationsComponent = () => (<div>
  <Typography variant="title">Clarifications to the Rules of the Game</Typography>
  <Rule source={Clarifications1}/>
  <Rule source={Clarifications2}/>
  <Rule source={Clarifications3}/>
  <Rule source={Clarifications4}/>
  <Rule source={Clarifications5}/>
  <Rule source={Clarifications6}/>
  <Rule source={Clarifications7}/>
  <Rule source={Clarifications8}/>
</div>);
const SubstitutionAreaRegulationsComponent = () => (<Rule source={SAR}/>);
const GuidelinesComponent = () => (<Rule source={Guidelines}/>);
const CourtAndGoalComponent = () => (<Rule source={GuidelinesPlayingCourts}/>);

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  }
});

const HandballRules = ({ classes, match }) => (
  <Paper className={classes.root}>
    <Route path={`${match.url}/foreword`} component={ForwordComponent} />
    <Route path={`${match.url}/rules-of-the-game`} component={RulesOfTheGameComponent} />
    <Route path={`${match.url}/hand-signals`} component={HandSignalsComponent} />
    <Route path={`${match.url}/clarifications`} component={ClarificationsComponent} />
    <Route path={`${match.url}/substitution-area-regulations`} component={SubstitutionAreaRegulationsComponent} />
    <Route path={`${match.url}/guidelines-and-interpretations`} component={GuidelinesComponent} />
    <Route path={`${match.url}/guidelines-for-playing-courts-and-goals`} component={CourtAndGoalComponent} />
    <Typography color="textSecondary">Edition: 1 July 2016</Typography>
    <Typography color="textSecondary">Source: http://www.ihf.info/files/Uploads/NewsAttachments/0_New-Rules%20of%20the%20Game_GB.pdf</Typography>
  </Paper>
);


export default withStyles(styles)(HandballRules);
