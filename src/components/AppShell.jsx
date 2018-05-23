import React, { Component } from 'react';
import { Route } from 'react-router';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from './Menu';
import Loading from './Loading';

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

const Statistics = Loadable({
  loader: () => import('./Statistics'),
  loading: Loading,
});

class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(open) {
    this.setState({
      menuOpen: open,
    });
  }

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
        <Route path="/stats" component={Statistics} />
        <Route path="/" component={RulesTest} exact />
      </div>
    );
  }
}

AppShell.propTypes = {
  classes: PropTypes.shape({
    menuButton: PropTypes.string,
    flex: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(AppShell);
