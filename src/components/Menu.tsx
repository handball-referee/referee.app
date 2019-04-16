/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  WithStyles, createStyles, withStyles, Theme,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import TestIcon from "@material-ui/icons/Assignment";
import RulesIcon from "@material-ui/icons/FormatListBulleted";
import StatsIcon from "@material-ui/icons/TrendingUp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { WithTranslation, withTranslation } from "react-i18next";

const styles = (theme: Theme) => createStyles({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

interface Props extends WithTranslation, WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
}

interface State {
  rulesOpen: boolean;
}

class Menu extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      rulesOpen: false,
    };

    this.handleRulesClick = this.handleRulesClick.bind(this);
  }

  public handleRulesClick() {
    const { rulesOpen } = this.state;

    this.setState({
      rulesOpen: !rulesOpen,
    });
  }

  public render() {
    const {
      open, onClose, classes, t,
    } = this.props;
    const { rulesOpen } = this.state;

    const SubHeader = (
      <ListSubheader component="div">{t("Menu")}</ListSubheader>
    );

    const TestLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/" {...props} innerRef={ref} />);
    const StatsLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/stats" {...props} innerRef={ref} />);
    const ForewordLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/rules/foreword" {...props} innerRef={ref} />);
    const RulesLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/rules/rules-of-the-game" {...props} innerRef={ref} />);
    const HandSignalsLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/rules/hand-signals" {...props} innerRef={ref} />);
    const ClarificationsLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/rules/clarifications" {...props} innerRef={ref} />);
    const SARLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/rules/substitution-area-regulations" {...props} innerRef={ref} />);
    const GuidelinesLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/rules/guidelines-and-interpretations" {...props} innerRef={ref} />);
    const PlayingCourtLink = React.forwardRef<HTMLAnchorElement, Partial<ListItemProps>>((props, ref) => <Link to="/rules/guidelines-for-playing-courts-and-goals" {...props} innerRef={ref} />);

    return (
      <Drawer open={open} onClose={onClose}>
        <List component="nav" subheader={SubHeader}>
          <ListItem button component={TestLink} onClick={onClose}>
            <ListItemIcon>
              <TestIcon />
            </ListItemIcon>
            <ListItemText primary={t("Referee Test")} />
          </ListItem>
          <ListItem button onClick={this.handleRulesClick}>
            <ListItemIcon>
              <RulesIcon />
            </ListItemIcon>
            <ListItemText primary={t("Handball Rules")} />
            {rulesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={rulesOpen} timeout="auto" unmountOnExit>
            {/*
            // @ts-ignore */}
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} component={ForewordLink} onClick={onClose}>
                <ListItemText primary={t("Foreword")} />
              </ListItem>
              <ListItem button className={classes.nested} component={RulesLink} onClick={onClose}>
                <ListItemText primary={t("Rules of the Game")} />
              </ListItem>
              <ListItem button className={classes.nested} component={HandSignalsLink} onClick={onClose}>
                <ListItemText primary={t("Hand Signals")} />
              </ListItem>
              <ListItem button className={classes.nested} component={ClarificationsLink} onClick={onClose}>
                <ListItemText primary={t("Clarifications to the Rules of the Game")} />
              </ListItem>
              <ListItem button className={classes.nested} component={SARLink} onClick={onClose}>
                <ListItemText primary={t("Substitution Area Regulations")} />
              </ListItem>
              <ListItem button className={classes.nested} component={GuidelinesLink} onClick={onClose}>
                <ListItemText primary={t("Guidelines and Interpretations")} />
              </ListItem>
              <ListItem button className={classes.nested} component={PlayingCourtLink} onClick={onClose}>
                <ListItemText primary={t("Guidelines for Playing Courts and Goals")} />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <ListItem button component={StatsLink} onClick={onClose}>
          <ListItemIcon>
            <StatsIcon />
          </ListItemIcon>
          <ListItemText primary={t("Statistics")} />
        </ListItem>
      </Drawer>
    );
  }
}

export default withStyles(styles)(withTranslation()(Menu));
