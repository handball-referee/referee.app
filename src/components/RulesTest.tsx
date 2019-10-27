import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Theme, WithStyles, withStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CrossIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { WithTranslation, withTranslation } from "react-i18next";
import { Dispatch } from "redux";
import RulesTestQuestion from "./RulesTestQuestion";
import {
  getCorrect,
  getCurrentAnswer,
  getCurrentQuestion,
  getPercentage,
  getWrong, IApplicationState,
  isLoaded,
  isLoading,
} from "../reducers";
import Loading from "./Loading";
import { IAnswer, IQuestion } from "../model";
import { StatsActions } from "../actions/stats";
import { DataActions } from "../actions/data";

const styles = (theme: Theme) => ({
  correct: {
    backgroundColor: green[600],
    color: "white",
  },
  wrong: {
    backgroundColor: red[600],
    color: "white",
  },
  flex: {
    flex: 1,
  },
  badge: {
    marginRight: theme.spacing.unit * 3,
  },
});

interface Props extends WithTranslation, WithStyles<typeof styles> {
  loading: boolean;
  loaded: boolean;
  question: IQuestion|null;
  answer: IAnswer;
  correct: number;
  wrong: number;
  percentage: number;
  handleLoadingStarted: (lang: string) => void;
  handleLoadingSuccess: (questions: IQuestion[], lang: string) => void;
  handleLoadingError: (lang: string) => void;
  handleCheckAnswers: (id: string, answers: string[]) => void;
  handleNextQuestion: () => void;
  handleReset: () => void;
}

class RulesTest extends Component<Props> {
  public static defaultProps = {
    correct: 0,
    wrong: 0,
    percentage: 0,
  };

  public componentDidMount() {
    const {
      loading,
      loaded,
      i18n,
    } = this.props;

    if (!loaded && !loading) {
      this.handleLoadData(i18n.language);
    }
  }

  public componentDidUpdate() {
    const {
      loading,
      loaded,
      i18n,
    } = this.props;

    if (!loaded && !loading) {
      this.handleLoadData(i18n.language);
    }
  }

  private handleLoadData(lang: string) {
    const {
      handleLoadingStarted,
      handleLoadingSuccess,
      handleLoadingError,
    } = this.props;

    handleLoadingStarted(lang);
    fetch(`/data/questions/${lang}.json`).then(response => response.json().then(json => ({ json, response }))).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    }).then(
      response => handleLoadingSuccess(response, lang),
      () => handleLoadingError(lang),
    );
  }

  public render() {
    const {
      classes,
      question,
      answer,
      handleCheckAnswers,
      handleNextQuestion,
      correct,
      wrong,
      percentage,
      handleReset,
      loading,
      t,
    } = this.props;

    if (loading || !question) {
      return (<Loading />);
    }

    let questionOutput;
    if (!question) {
      questionOutput = t("Question not translated");
    } else {
      questionOutput = (
        <RulesTestQuestion
          question={question}
          correct={answer.correct}
          rule={answer.rule}
          checkAnswers={handleCheckAnswers}
          nextQuestion={handleNextQuestion}
        />
      );
    }

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
            <Typography variant="subtitle1" color="inherit" className={classes.flex}>
              {percentage}

              {"% "}
              {t("correct")}
            </Typography>
            <Button color="inherit" onClick={handleReset}>{t("Reset")}</Button>
          </Toolbar>
        </AppBar>
        {questionOutput}
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState, props: Props) => ({
  question: getCurrentQuestion(state, props.i18n.language),
  answer: getCurrentAnswer(state),
  loaded: isLoaded(state, props.i18n.language),
  loading: isLoading(state, props.i18n.language),
  correct: getCorrect(state),
  wrong: getWrong(state),
  percentage: getPercentage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleCheckAnswers: (question: string, answers: string[]) => dispatch(
    StatsActions.checkAnswers(answers, question),
  ),
  handleNextQuestion: () => dispatch(DataActions.nextQuestion()),
  handleReset: () => dispatch(StatsActions.reset()),
  handleLoadingStarted: (lang: string) => dispatch(DataActions.loadQuestionsStarted(lang)),
  handleLoadingSuccess: (payload: IQuestion[], lang: string) => dispatch(
    DataActions.loadQuestionsSuccess(payload, lang),
  ),
  handleLoadingError: (lang: string) => dispatch(DataActions.loadQuestionsError(lang)),
});


export default withStyles(styles)(withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesTest)));
