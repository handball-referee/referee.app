import { ActionsUnion, createAction } from "./helpers";
import { IStatsAnswer } from "../model";

export const UIActions = {
  sort: (property: keyof IStatsAnswer) => createAction("SORT", property),
};

export type UIActions = ActionsUnion<typeof UIActions>;
