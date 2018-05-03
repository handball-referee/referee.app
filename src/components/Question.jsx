import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Questions from '../data/questions.json';
import RelevantRules from './RelevantRules';

const styles = theme => ({
  correct: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  wrong: {
    color: red[600],
    '&$checked': {
      color: red[500],
    },
  },
  button: {
    margin: theme.spacing.unit * 3,
  },
  question: {
    marginBottom: theme.spacing.unit * 3,
  },
  questionText: {
    padding: theme.spacing.unit * 3,
  }
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answers: [],
      showCorrect: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.updateAnswers = this.updateAnswers.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
  }

  nextQuestion() {
    this.setState({
      question: Questions[Math.floor(Math.random() * Questions.length)],
      answers: [],
      showCorrect: false,
    });
  }

  updateAnswers(option, checked) {
    const { answers } = this.state;

    if (checked) {
      answers.push(option);
    } else {
      const index = answers.indexOf(option);
      if (index >= 0) {
        answers.splice(index, 1);
      }
    }

    this.setState({
      answers,
    });
  }

  checkAnswers() {
    this.setState({
      showCorrect: true,
    });
  }

  render() {
    const { question, answers, showCorrect } = this.state;
    const { classes } = this.props;

    if (!question) {
      return (
        <Paper elevation={1}>
          <Button className={classes.button} variant="raised" onClick={this.nextQuestion}>
            Start
          </Button>
        </Paper>
      );
    }

    return (
      <div>
        <Paper className={classes.question} elevation={1}>
          <Typography className={classes.questionText}>
            {question.question}
          </Typography>
          <Divider />
          <List>
            {Object.keys(question.answers).map((option) => {
              const text = question.answers[option];
              const selected = answers.indexOf(option) > -1;
              const correct = question.correct.indexOf(option) > -1;
              let className = '';
              if (showCorrect) {
                if ((correct && selected) || (!correct && !selected)) {
                  className = classes.correct;
                } else {
                  className = classes.wrong;
                }
              }
              return (
                <ListItem key={option}>
                  <Checkbox
                    tabIndex={-1}
                    disableRipple
                    color="primary"
                    classes={{
                      root: className,
                      checked: classes.checked,
                    }}
                    checked={selected}
                    onChange={(obj, checked) => this.updateAnswers(option, checked)}
                  />
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
          { showCorrect && (
            <Button className={classes.button} variant="raised" onClick={this.nextQuestion}>
              Next
            </Button>
          )}
          { !showCorrect && (
            <Button className={classes.button} variant="raised" onClick={this.checkAnswers}>
              Check
            </Button>
          )}
        </Paper>
        { showCorrect && (
          <RelevantRules rules={question.rule} />
        )}
      </div>
    );
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Question);
