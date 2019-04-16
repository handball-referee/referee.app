import React, { Component } from "react";
import {
  WithStyles, createStyles, withStyles, Theme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { WithTranslation, withTranslation } from "react-i18next";
import RelevantRules from "./RelevantRules";
import Question from "./Question";
import { IQuestion } from "../model";

const styles = (theme: Theme) => createStyles({
  button: {
    margin: theme.spacing.unit * 3,
  },
  question: {
    marginBottom: theme.spacing.unit * 3,
  },
});

interface Props extends WithTranslation, WithStyles<typeof styles> {
  question: IQuestion;
  nextQuestion: () => void;
  checkAnswers: (id: string, answers: string[]) => void;
  correct: string[];
  rule: string[];
}

interface State {
  answers: string[];
  showCorrect: boolean;
}

class RulesTestQuestion extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      showCorrect: false,
      answers: [],
    };
  }

  private nextQuestion = () => {
    const { nextQuestion } = this.props;

    this.setState({
      showCorrect: false,
      answers: [],
    });
    nextQuestion();
  }

  private handleAnswerSelection = (answers: string[]) => {
    this.setState({
      answers,
    });
  }

  private handleCheckAnswers = () => {
    const { checkAnswers, question } = this.props;
    const { answers } = this.state;

    this.setState({
      showCorrect: true,
    });

    checkAnswers(question.id, answers);
  }

  public render() {
    const { showCorrect, answers } = this.state;
    const {
      question, classes, correct, rule, t,
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
              {t("Next")}
            </Button>
          )}
          { !showCorrect && (
            <Button className={classes.button} variant="contained" onClick={this.handleCheckAnswers}>
              {t("Check")}
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

export default withStyles(styles)(withTranslation()(RulesTestQuestion));
