import React from 'react';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loadable from 'react-loadable';
import Loading from './Loading';
import Rule from './Rule';

const render = (loaded) => (
  <Rule source={loaded.default}/>
)

const Rule1Component = Loadable({
  loader: () => import('../data/rules/1.md'),
  loading: Loading,
  render,
});

const Rule2Component = Loadable({
  loader: () => import('../data/rules/2.md'),
  loading: Loading,
  render,
});

const Rule3Component = Loadable({
  loader: () => import('../data/rules/3.md'),
  loading: Loading,
  render,
});

const Rule4Component = Loadable({
  loader: () => import('../data/rules/4.md'),
  loading: Loading,
  render,
});

const Rule5Component = Loadable({
  loader: () => import('../data/rules/5.md'),
  loading: Loading,
  render,
});

const Rule6Component = Loadable({
  loader: () => import('../data/rules/6.md'),
  loading: Loading,
  render,
});

const Rule7Component = Loadable({
  loader: () => import('../data/rules/7.md'),
  loading: Loading,
  render,
});

const Rule8Component = Loadable({
  loader: () => import('../data/rules/8.md'),
  loading: Loading,
  render,
});

const Rule9Component = Loadable({
  loader: () => import('../data/rules/9.md'),
  loading: Loading,
  render,
});

const Rule10Component = Loadable({
  loader: () => import('../data/rules/10.md'),
  loading: Loading,
  render,
});

const Rule11Component = Loadable({
  loader: () => import('../data/rules/11.md'),
  loading: Loading,
  render,
});

const Rule12Component = Loadable({
  loader: () => import('../data/rules/12.md'),
  loading: Loading,
  render,
});

const Rule13Component = Loadable({
  loader: () => import('../data/rules/13.md'),
  loading: Loading,
  render,
});

const Rule14Component = Loadable({
  loader: () => import('../data/rules/14.md'),
  loading: Loading,
  render,
});

const Rule15Component = Loadable({
  loader: () => import('../data/rules/15.md'),
  loading: Loading,
  render,
});

const Rule16Component = Loadable({
  loader: () => import('../data/rules/16.md'),
  loading: Loading,
  render,
});

const Rule17Component = Loadable({
  loader: () => import('../data/rules/17.md'),
  loading: Loading,
  render,
});

const Rule18Component = Loadable({
  loader: () => import('../data/rules/18.md'),
  loading: Loading,
  render,
});

const RuleSwitchComponent = ({ rule }) => {
  const res = rule.match(/^([0-9]{1,2}):[0-9]{1,2}/);

  switch (res[1]) {
    case "1":
      return <Rule1Component/>;
    case "2":
      return <Rule2Component/>;
    case "3":
      return <Rule3Component/>;
    case "4":
      return <Rule4Component/>;
    case "5":
      return <Rule5Component/>;
    case "6":
      return <Rule6Component/>;
    case "7":
      return <Rule7Component/>;
    case "8":
      return <Rule8Component/>;
    case "9":
      return <Rule9Component/>;
    case "10":
      return <Rule10Component/>;
    case "11":
      return <Rule11Component/>;
    case "12":
      return <Rule12Component/>;
    case "13":
      return <Rule13Component/>;
    case "14":
      return <Rule14Component/>;
    case "15":
      return <Rule15Component/>;
    case "16":
      return <Rule16Component/>;
    case "17":
      return <Rule17Component/>;
    case "18":
      return <Rule18Component/>;
    default:
      console.log(rule);
      console.log(res);
      return (<Typography>Rule Text not found</Typography>)
  }
};

export default ({ rules }) => {
  if (!rules || !Array.isArray(rules)) {
    return (<div/>)
  }

  return (
    <div>
      {rules.map((rule) => {
        return (
          <ExpansionPanel key={rule}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{rule}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RuleSwitchComponent rule={rule} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}
