/* eslint-disable */
import React, { Component, MouseEvent } from "react";
import {Link} from "react-router-dom";
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
    paddingLeft: theme.spacing(4),
  },
});

interface Props extends WithTranslation, WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
}

interface State {
  rulesOpen: boolean;
}

interface Test {

}

interface ListItemLinkProps {
  className?: string;
  icon?: React.ReactElement;
  primary: React.ReactNode;
  to: string;
  onClick: (event: MouseEvent) => void;
}

function ListItemLink({
  icon,
  primary,
  to,
  onClick,
  className
}: ListItemLinkProps) {
  const renderLink = React.useMemo(
    // @ts-ignore
    () => React.forwardRef<any, ListItemProps>((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <ListItem className={className} button component={renderLink} onClick={onClick}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
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

    return (
      <Drawer open={open} onClose={onClose}>
        <List component="nav" subheader={SubHeader}>
          <ListItemLink primary={t("Referee Test")} icon={<TestIcon />} to="/" onClick={onClose} />
          <ListItem button onClick={this.handleRulesClick}>
            <ListItemIcon>
              <RulesIcon />
            </ListItemIcon>
            <ListItemText primary={t("Handball Rules")} />
            {rulesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={rulesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink className={classes.nested} primary={t("Foreword")} to="/rules/foreword" onClick={onClose}/>
              <ListItemLink className={classes.nested} primary={t("Rules of the Game")} to="/rules/rules-of-the-game" onClick={onClose}/>
              <ListItemLink className={classes.nested} primary={t("Hand Signals")} to="/rules/hand-signals" onClick={onClose}/>
              <ListItemLink className={classes.nested} primary={t("Clarifications to the Rules of the Game")} to="/rules/clarifications" onClick={onClose}/>
              <ListItemLink className={classes.nested} primary={t("Substitution Area Regulations")} to="/rules/substitution-area-regulations" onClick={onClose}/>
              <ListItemLink className={classes.nested} primary={t("Guidelines and Interpretations")} to="/rules/guidelines-and-interpretations" onClick={onClose}/>
              <ListItemLink className={classes.nested} primary={t("Guidelines for Playing Courts and Goals")} to="/rules/guidelines-for-playing-courts-and-goals" onClick={onClose}/>
            </List>
          </Collapse>
        </List>
        <ListItemLink className={classes.nested} primary={t("Statistics")} icon={<StatsIcon />} to="/stats" onClick={onClose}/>
      </Drawer>
    );
  }
}

export default withStyles(styles)(withTranslation()(Menu));
