import { ActionsUnion, createAction } from "./helpers";
import { IQuestion } from "../model";

export const DataActions = {
  nextQuestion: () => createAction("NEXT"),
  loadQuestionsStarted: (lang: string) => createAction("LOAD_QUESTIONS_STARTED", null, {
    lang,
  }),
  loadQuestionsSuccess: (payload: IQuestion[], lang: string) => createAction("LOAD_QUESTIONS_SUCCESS", payload, {
    lang,
  }),
  loadQuestionsError: (lang: string) => createAction("LOAD_QUESTIONS_ERROR", null, {
    lang,
  }),
};

export type DataActions = ActionsUnion<typeof DataActions>;
