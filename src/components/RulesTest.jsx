import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CrossIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import RulesTestQuestion from './RulesTestQuestion';
import {
  getCorrect,
  getCurrentAnswer,
  getCurrentQuestion,
  getPercentage,
  getWrong,
  isLoaded,
  isLoading,
} from '../reducers';
import {
  checkAnswers,
  loadQuestionsError,
  loadQuestionsStarted,
  loadQuestionsSuccess,
  nextQuestion,
  reset,
} from '../actions';
import Loading from './Loading';
import {withTranslation} from "react-i18next";

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
  componentDidMount() {
    const {
      loading,
      loaded,
      i18n,
    } = this.props;

    if (!loaded && !loading) {
      this.handleLoadData(i18n.language);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      loading,
      loaded,
      i18n,
    } = this.props;

    if (!loaded && !loading) {
      this.handleLoadData(i18n.language);
    }
  }

  render() {
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
      i18n,
      t,
    } = this.props;

    if (loading || !question) {
      return (<Loading />);
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
% {t('correct')}
            </Typography>
            <Button color="inherit" onClick={handleReset}>{t('Reset')}</Button>
          </Toolbar>
        </AppBar>
        <RulesTestQuestion
          question={question}
          correct={answer.correct}
          rule={answer.rule}
          lang={i18n.language}
          checkAnswers={handleCheckAnswers}
          nextQuestion={handleNextQuestion}
        />
      </div>
    );
  }

  handleLoadData(lang) {
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
}

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
  }),
  answer: PropTypes.shape({
    rule: PropTypes.arrayOf(PropTypes.string),
    correct: PropTypes.arrayOf(PropTypes.string),
  }),
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired,
  }).isRequired,
  correct: PropTypes.number,
  wrong: PropTypes.number,
  percentage: PropTypes.number,
  handleCheckAnswers: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleLoadingStarted: PropTypes.func.isRequired,
  handleLoadingSuccess: PropTypes.func.isRequired,
  handleLoadingError: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

RulesTest.defaultProps = {
  correct: 0,
  wrong: 0,
  percentage: 0,
};

const mapStateToProps = (state, props) => ({
  question: getCurrentQuestion(state, props.i18n.language),
  answer: getCurrentAnswer(state),
  loaded: isLoaded(state, props.match.params.lang),
  loading: isLoading(state, props.match.params.lang),
  correct: getCorrect(state),
  wrong: getWrong(state),
  percentage: getPercentage(state),
});

const mapDispatchToProps = dispatch => ({
  handleCheckAnswers: (question, answers) => dispatch(checkAnswers(question, answers)),
  handleNextQuestion: () => dispatch(nextQuestion()),
  handleReset: () => dispatch(reset()),
  handleLoadingStarted: lang => dispatch(loadQuestionsStarted(lang)),
  handleLoadingSuccess: (payload, lang) => dispatch(loadQuestionsSuccess(payload, lang)),
  handleLoadingError: lang => dispatch(loadQuestionsError(lang)),
});


export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RulesTest)));
