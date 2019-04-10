import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import RelevantRules from './RelevantRules';
import Question from './Question';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 3,
  },
  question: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class RulesTestQuestion extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string,
      rule: PropTypes.string,
      checked: PropTypes.string,
    }).isRequired,
    nextQuestion: PropTypes.func.isRequired,
    checkAnswers: PropTypes.func.isRequired,
    question: PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answers: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    correct: PropTypes.arrayOf(PropTypes.string).isRequired,
    rule: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false,
      answers: [],
    };
  }

  nextQuestion = () => {
    const { nextQuestion } = this.props;

    this.setState({
      showCorrect: false,
      answers: [],
    });
    nextQuestion();
  }

  handleAnswerSelection = (answers) => {
    this.setState({
      answers,
    });
  }

  handleCheckAnswers = () => {
    this.setState({
      showCorrect: true,
    });
    this.props.checkAnswers(this.props.question.id, this.state.answers);
  }

  render() {
    const { showCorrect, answers } = this.state;
    const {
      question, classes, correct, rule,
    } = this.props;

    return (
      <div>
        <Paper className={classes.question} elevation={1}>
          { question && (
            <Question
              answers={answers}
              question={question}
              correct={correct}
              showCorrect={showCorrect}
              onAnswerSelect={this.handleAnswerSelection}
            />
          )}
          { showCorrect && (
            <Button className={classes.button} variant="contained" onClick={this.nextQuestion}>
              Next
            </Button>
          )}
          { !showCorrect && (
            <Button className={classes.button} variant="contained" onClick={this.handleCheckAnswers}>
              Check
            </Button>
          )}
        </Paper>
        { showCorrect && (
          <RelevantRules rules={rule} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(RulesTestQuestion);
