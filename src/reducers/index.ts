import { combineReducers } from "redux";
import data, { IDataState } from "./data";
import stats, { IStatsState } from "./stats";
import ui, { IUIState } from "./ui";
import { IStatsAnswer } from "../model";

export default () => combineReducers({
  data,
  stats,
  ui,
});

export interface IApplicationState {
  data: IDataState;
  stats: IStatsState;
  ui: IUIState;
}

export const listStats = (state: IApplicationState) => {
  const q: IStatsAnswer[] = Object.keys(state.stats.answers).map(id => state.stats.answers[id]);
  const { order, orderBy } = state.ui;

  return order === "desc"
    ? q.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : q.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
};

export const getCurrentQuestion = (state: IApplicationState, lang: string) => {
  if (!state.data.questions[lang]) {
    return null;
  }
  return state.data.questions[lang][state.data.currentQuestion];
};

export const getCurrentAnswer = (state: IApplicationState) => state.stats.answers[state.data.currentQuestion]; // eslint-disable-line

export const isLoaded = (state: IApplicationState, lang: string) => {
  if (!state.data.loaded[lang]) {
    return false;
  }
  return state.data.loaded[lang];
};

export const isLoading = (state: IApplicationState, lang: string) => {
  if (!state.data.loading[lang]) {
    return false;
  }
  return state.data.loading[lang];
};

export const getCorrect = (state: IApplicationState) => state.stats.correct;
export const getWrong = (state: IApplicationState) => state.stats.wrong;
export const getPercentage = (state: IApplicationState) => state.stats.correctPercentage;
export const getOrder = (state: IApplicationState) => state.ui.order;
export const getOrderBy = (state: IApplicationState) => state.ui.orderBy;
