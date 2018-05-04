import React, { Component } from 'react';
import { Route } from 'react-router';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Loadable from 'react-loadable';
import Menu from "./Menu";
import Loading from "./Loading";

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const HandballRules = Loadable({
  loader: () => import('./HandballRules'),
  loading: Loading,
});

const RulesTest = Loadable({
  loader: () => import('./RulesTest'),
  loading: Loading,
});

class AppShell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  };

  toggleMenu(open) {
    this.setState({
      menuOpen: open,
    });
  };

  render() {
    const { menuOpen } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Menu open={menuOpen} onClose={() => this.toggleMenu(false)} />
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Handball Referee
            </Typography>
          </Toolbar>
        </AppBar>
        <Route path="/rules" component={HandballRules} />
        <Route path="/" component={RulesTest} exact />
      </div>
    );
  }
}

export default withStyles(styles)(AppShell);
