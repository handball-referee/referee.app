import React, { Component, MouseEvent } from "react";
import { Route } from "react-router";
import loadable from "@loadable/component";
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Language from "@material-ui/icons/Language";
import MenuIcon from "@material-ui/icons/Menu";
import UIMenu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { WithTranslation, withTranslation } from "react-i18next";
import i18next from "i18next";
import Menu from "./Menu";
import Loading from "./Loading";

const styles = createStyles({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

interface Props extends WithTranslation, WithStyles<typeof styles> {

}

interface State {
  menuOpen: boolean;
  anchorEl: HTMLElement|null;
}

const HandballRules = loadable(() => import("./HandballRules"), {
  fallback: <Loading />,
});

const RulesTest = loadable(() => import("./RulesTest"), {
  fallback: <Loading />,
});

const Statistics = loadable(() => import("./Statistics"), {
  fallback: <Loading />,
});

class AppShell extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      menuOpen: false,
      anchorEl: null,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  private handleLanguageChange = (lang: string) => () => {
    i18next.changeLanguage(lang);
    this.setState({ anchorEl: null });
  }

  private handleMenuClose() {
    this.setState({ anchorEl: null });
  }

  private handleMenu(event: MouseEvent<HTMLElement>) {
    this.setState({ anchorEl: event.currentTarget });
  }

  private toggleMenu(open: boolean) {
    this.setState({
      menuOpen: open,
    });
  }

  public render() {
    const { menuOpen, anchorEl } = this.state;
    const { classes, t } = this.props;
    const open = !!anchorEl;

    return (
      <div>
        <Menu open={menuOpen} onClose={() => this.toggleMenu(false)} />
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {t("Handball Referee")}
            </Typography>
            <div>
              <IconButton onClick={this.handleMenu} color="inherit">
                <Language />
              </IconButton>
              <UIMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleLanguageChange("en")}>English</MenuItem>
                <MenuItem onClick={this.handleLanguageChange("de")}>Deutsch</MenuItem>
                <MenuItem onClick={this.handleLanguageChange("es")}>Español</MenuItem>
              </UIMenu>
            </div>
          </Toolbar>
        </AppBar>
        <Route path="/rules" component={HandballRules} />
        <Route path="/stats" component={Statistics} />
        <Route path="/" component={RulesTest} exact />
      </div>
    );
  }
}

export default withStyles(styles)(withTranslation()(AppShell));
