import { combineReducers } from 'redux';
import data from './data';
import stats from './stats';
import ui from './ui';

export default () => combineReducers({
  data,
  stats,
  ui,
});

export const getQuestions = (state, lang) => {
  const q = Object.keys(state.data.questions[lang]).map(id => state.data.questions[lang][id]);
  const { order, orderBy } = state.ui;
  const result = order === 'desc'
    ? q.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : q.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

  return result;
};
export const getCurrentQuestion = (state, lang) => {
  if (!state.data.questions[lang]) {
    return null;
  }
  return state.data.questions[lang][state.data.currentQuestion];
};
export const getCurrentAnswer = state => state.stats.questions[state.data.currentQuestion];
export const isLoaded = (state, lang) => {
  if (!state.data.loaded[lang]) {
    return false;
  }
  return state.data.loaded[lang];
};
export const isLoading = (state, lang) => {
  if (!state.data.loading[lang]) {
    return false;
  }
  return state.data.loading[lang];
};
export const getCorrect = state => state.stats.correct;
export const getWrong = state => state.stats.wrong;
export const getPercentage = state => state.stats.correctPercentage;
export const getOrder = state => state.stats.order;
export const getOrderBy = state => state.stats.orderBy;
