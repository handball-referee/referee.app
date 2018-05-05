import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CrossIcon from '@material-ui/icons/Close';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Question from './Question';

const styles = theme => ({
  correct: {
    backgroundColor: green[600],
    color: 'white',
  },
  wrong: {
    backgroundColor: red[600],
    color: 'white',
  },
  flex: {
    flex: 1,
  },
  badge: {
    marginRight: theme.spacing.unit * 3,
  },
});

class RulesTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      wrong: 0,
    };

    this.onCorrect = this.onCorrect.bind(this);
    this.onWrong = this.onWrong.bind(this);
    this.reset = this.reset.bind(this);
  }

  onCorrect() {
    const { correct } = this.state;
    this.setState({
      correct: correct + 1,
    });
  }

  onWrong() {
    const { wrong } = this.state;
    this.setState({
      wrong: wrong + 1,
    });
  }

  reset() {
    this.setState({
      correct: 0,
      wrong: 0,
    });
  }

  render() {
    const { classes } = this.props;
    const { correct, wrong } = this.state;
    return (
      <div>
        <AppBar color="secondary" position="sticky">
          <Toolbar>
            <Badge classes={{ root: classes.badge, badge: classes.correct }} badgeContent={correct}>
              <CheckIcon />
            </Badge>
            <Badge classes={{ root: classes.badge, badge: classes.wrong }} badgeContent={wrong}>
              <CrossIcon />
            </Badge>
            <Typography variant="subheading" color="inherit" className={classes.flex}>
              {(correct + wrong) > 0 ? Math.round((100 / (correct + wrong)) * correct) : 0}% correct
            </Typography>
            <Button color="inherit" onClick={this.reset}>Reset</Button>
          </Toolbar>
        </AppBar>
        <Question onCorrect={this.onCorrect} onWrong={this.onWrong} />
      </div>
    );
  }
}

RulesTest.propTypes = {
  classes: PropTypes.shape({
    badge: PropTypes.object,
    correct: PropTypes.object,
    wrong: PropTypes.object,
    flex: PropTypes.object,
  }).isRequired,
};

export default withStyles(styles)(RulesTest);
