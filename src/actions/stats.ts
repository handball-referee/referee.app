import { ActionsUnion, createAction } from "./helpers";

export const StatsActions = {
  checkAnswers: (answers: string[], id: string) => createAction("CHECK", answers, {
    question: id,
  }),
  reset: () => createAction("RESET"),
};

export type StatsActions = ActionsUnion<typeof StatsActions>;
