import React, { Component } from "react";
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  WithStyles,
  createStyles, Theme,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/index";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import { IQuestion } from "../model";

const styles = (theme: Theme) => createStyles({
  correct: {
    color: green[600],
    "&$checked": {
      color: green[500],
    },
  },
  checked: {},
  wrong: {
    color: red[600],
    "&$checked": {
      color: red[500],
    },
  },
  questionText: {
    padding: theme.spacing.unit * 3,
  },
});

interface Props extends WithStyles<typeof styles> {
  answers: string[];
  onAnswerSelect: (answers: string[]) => void;
  question: IQuestion;
  showCorrect: boolean;
  viewOnly: boolean;
  correct: string[];
}

class Question extends Component<Props> {
  public static defaultProps = {
    onAnswerSelect: () => {},
    answers: [],
    showCorrect: false,
    viewOnly: false,
  };

  public updateAnswers = (option: string, checked: boolean) => {
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

  public render() {
    const {
      question,
      classes,
      showCorrect,
      answers,
      viewOnly,
      correct,
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
            const corr = correct.indexOf(option) > -1;
            let className = "";
            if (showCorrect && !viewOnly) {
              if ((corr && selected) || (!corr && !selected)) {
                className = classes.correct;
              } else {
                className = classes.wrong;
              }
            }
            if (viewOnly) {
              if (showCorrect) {
                selected = corr;
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
