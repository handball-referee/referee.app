import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CrossIcon from '@material-ui/icons/Close';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import RulesTestQuestion from './RulesTestQuestion';
import { getCorrect, getCurrentQuestion, getPercentage, getWrong } from '../reducers/question';
import { checkAnswers, nextQuestion, reset } from '../actions';

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

const RulesTest = ({
  classes,
  question,
  handleCheckAnswers,
  handleNextQuestion,
  correct,
  wrong,
  percentage,
  handleReset,
}) => (
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
          {percentage}% correct
        </Typography>
        <Button color="inherit" onClick={handleReset}>Reset</Button>
      </Toolbar>
    </AppBar>
    <RulesTestQuestion
      question={question}
      checkAnswers={handleCheckAnswers}
      nextQuestion={handleNextQuestion}
    />
  </div>
);

RulesTest.propTypes = {
  classes: PropTypes.shape({
    badge: PropTypes.string,
    correct: PropTypes.string,
    wrong: PropTypes.string,
    flex: PropTypes.string,
  }).isRequired,
  question: PropTypes.shape({
    question: PropTypes.string,
    answers: PropTypes.objectOf(PropTypes.string),
    correct: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  correct: PropTypes.number,
  wrong: PropTypes.number,
  percentage: PropTypes.number,
  handleCheckAnswers: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

RulesTest.defaultProps = {
  correct: 0,
  wrong: 0,
  percentage: 0,
};

const mapStateToProps = state => ({
  question: getCurrentQuestion(state),
  correct: getCorrect(state),
  wrong: getWrong(state),
  percentage: getPercentage(state),
});

const mapDispatchToProps = dispatch => ({
  handleCheckAnswers: answers => dispatch(checkAnswers(answers)),
  handleNextQuestion: () => dispatch(nextQuestion()),
  handleReset: () => dispatch(reset()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RulesTest));
