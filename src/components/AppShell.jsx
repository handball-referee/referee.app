import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import Loadable from 'react-loadable';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Language from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import UIMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
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

// const Statistics = Loadable({
//   loader: () => import('./Statistics'),
//   loading: Loading,
// });

class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      anchorEl: null,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  toggleMenu(open) {
    this.setState({
      menuOpen: open,
    });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { menuOpen, anchorEl } = this.state;
    const { classes } = this.props;
    const open = !!anchorEl;

    return (
      <div>
        <Route
          path="/:lang"
          render={props => (
            <Menu open={menuOpen} onClose={() => this.toggleMenu(false)} {...props} />
          )}
        />
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Handball Referee
            </Typography>
            <div>
              <IconButton onClick={this.handleMenu} color="inherit">
                <Language />
              </IconButton>
              <UIMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleMenuClose}
              >
                <MenuItem component={Link} to="/en" onClick={this.handleMenuClose}>English</MenuItem>
                <MenuItem component={Link} to="/es" onClick={this.handleMenuClose}>Español</MenuItem>
              </UIMenu>
            </div>
          </Toolbar>
        </AppBar>
        <Route exact path="/" render={() => (<Redirect to="/en" />)} />
        <Route path="/:lang/rules" component={HandballRules} />
        {/* <Route path="/:lang/stats" component={Statistics} /> */}
        <Route path="/:lang" component={RulesTest} exact />
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
