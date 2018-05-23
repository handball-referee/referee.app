import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Dialog, DialogTitle, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Question from './Question';
import RelevantRules from './RelevantRules';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 1,
  },
  subheader: {
    paddingLeft: theme.spacing.unit * 3,
  },
});

class QuestionDialog extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      subheader: PropTypes.string.isRequired,
    }).isRequired,
    question: PropTypes.shape({
      question: PropTypes.string,
      answers: PropTypes.objectOf(PropTypes.string),
      correct: PropTypes.arrayOf(PropTypes.string),
    }),
  };

  static defaultProps = {
    question: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      showAnswers: false,
    };
  }

  handleChange = () => {
    const { showAnswers } = this.state;

    this.setState({
      showAnswers: !showAnswers,
    });
  };

  render() {
    const { question, classes, ...other } = this.props;
    const { showAnswers } = this.state;

    return (
      <Dialog aria-labelledby="question-dialog-title" {...other}>
        <DialogTitle id="question-dialog-title">Question {question && question.id}</DialogTitle>
        <Typography className={classes.root}>
          <Checkbox checked={showAnswers} onChange={this.handleChange} />
          Show answers
        </Typography>
        <Question question={question} showCorrect={showAnswers} viewOnly />
        <Typography variant="subheading" className={classes.subheader}>
          Relevant Rules
        </Typography>
        {question && <RelevantRules rules={question.rule} />}
      </Dialog>
    );
  }
}

export default withStyles(styles)(QuestionDialog);
