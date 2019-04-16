/* eslint-disable */
import { Action, ActionCreator, ActionCreatorsMapObject } from "redux";

export interface IActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export interface IActionWithPayloadAndMeta<T extends string, M, P> extends IActionWithPayload<T, P> {
  meta: M;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): IActionWithPayload<T, P>;
export function createAction<T extends string, P, M>(type: T, payload: P, meta: M): IActionWithPayloadAndMeta<T, M, P>;
export function createAction<T extends string, P, M>(type: T, payload?: P, meta?: M) {
  return payload === undefined && meta === undefined ?
    { type } : meta === undefined ? { type, payload } : { type, meta, payload };
}

export interface IRequestActionCreatorsMap<A = any> {
  failure: ActionCreator<A>;
  started: ActionCreator<A>;
  successful: ActionCreator<A>;
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
