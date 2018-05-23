import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List, { ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import TestIcon from '@material-ui/icons/Assignment';
import RulesIcon from '@material-ui/icons/FormatListBulleted';
import StatsIcon from '@material-ui/icons/TrendingUp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesOpen: false,
    };

    this.handleRulesClick = this.handleRulesClick.bind(this);
  }

  handleRulesClick() {
    const { rulesOpen } = this.state;

    this.setState({
      rulesOpen: !rulesOpen,
    });
  }

  render() {
    const { open, onClose, classes } = this.props;
    const { rulesOpen } = this.state;

    const SubHeader = (
      <ListSubheader component="div">Menu</ListSubheader>
    );

    return (
      <Drawer open={open} onClose={onClose}>
        <List component="nav" subheader={SubHeader}>
          <ListItem button component={Link} to="/" onClick={onClose}>
            <ListItemIcon>
              <TestIcon />
            </ListItemIcon>
            <ListItemText primary="Referee Test" />
          </ListItem>
          <ListItem button onClick={this.handleRulesClick}>
            <ListItemIcon>
              <RulesIcon />
            </ListItemIcon>
            <ListItemText primary="Handball Rules" />
            {rulesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={rulesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} component={Link} to="/rules/foreword" onClick={onClose}>
                <ListItemText primary="Foreword" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/rules/rules-of-the-game" onClick={onClose}>
                <ListItemText primary="Rules of the Game" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/rules/hand-signals" onClick={onClose}>
                <ListItemText primary="Hand Signals" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/rules/clarifications" onClick={onClose}>
                <ListItemText primary="Clarifications to the Rules of the Game" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/rules/substitution-area-regulations" onClick={onClose}>
                <ListItemText primary="Substitution Area Regulations" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/rules/guidelines-and-interpretations" onClick={onClose}>
                <ListItemText primary="Guidelines and Interpretations" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/rules/guidelines-for-playing-courts-and-goals" onClick={onClose}>
                <ListItemText primary="Guidelines for Playing Courts and Goals" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <ListItem button component={Link} to="/stats" onClick={onClose}>
          <ListItemIcon>
            <StatsIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    nested: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Menu);
