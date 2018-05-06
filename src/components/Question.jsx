import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Divider, List, ListItem, ListItemText, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles/index';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

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
  questionText: {
    padding: theme.spacing.unit * 3,
  },
});

class Question extends Component {
  static propTypes = {
    onAnswerSelect: PropTypes.func,
    answers: PropTypes.arrayOf(PropTypes.string),
    classes: PropTypes.shape({
      questionText: PropTypes.string,
      correct: PropTypes.string,
      wrong: PropTypes.string,
      checked: PropTypes.string,
    }).isRequired,
    showCorrect: PropTypes.bool,
    question: PropTypes.shape({
      question: PropTypes.string,
      answers: PropTypes.objectOf(PropTypes.string),
      correct: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    viewOnly: PropTypes.bool,
  };

  static defaultProps = {
    onAnswerSelect: () => {},
    answers: [],
    showCorrect: false,
    viewOnly: false,
  };

  updateAnswers = (option, checked) => {
    const { onAnswerSelect, answers } = this.props;

    if (checked) {
      answers.push(option);
    } else {
      const index = answers.indexOf(option);
      if (index >= 0) {
        answers.splice(index, 1);
      }
    }

    onAnswerSelect(answers);
  }

  render() {
    const {
      question,
      classes,
      showCorrect,
      answers,
      viewOnly
    } = this.props;

    return (
      <div>
        <Typography className={classes.questionText}>
          {question.question}
        </Typography>
        <Divider />
        <List>
          {Object.keys(question.answers).map((option) => {
            const text = question.answers[option];
            let selected = answers.indexOf(option) > -1;
            const correct = question.correct.indexOf(option) > -1;
            let className = '';
            if (showCorrect && !viewOnly) {
              if ((correct && selected) || (!correct && !selected)) {
                className = classes.correct;
              } else {
                className = classes.wrong;
              }
            }
            if (viewOnly) {
              if (showCorrect) {
                selected = correct;
              } else {
                selected = false;
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
      </div>
    );
  }
}

export default withStyles(styles)(Question);
