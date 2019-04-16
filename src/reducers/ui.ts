import u from "updeep";
import { UIActions } from "../actions/ui";
import { IStatsAnswer } from "../model";

export interface IUIState {
  order: "asc" | "desc";
  orderBy: keyof IStatsAnswer;
}

const initialState: IUIState = {
  order: "asc",
  orderBy: "id",
};

const reducer = (state: IUIState = initialState, action: UIActions) => {
  switch (action.type) {
    case "SORT": {
      let { orderBy, order } = state;
      if (action.payload === orderBy) {
        order = order === "asc" ? "desc" : "asc";
      } else {
        orderBy = action.payload;
        order = "asc";
      }
      return u({
        orderBy,
        order,
      }, state);
    }
    default:
      return state;
  }
};

export default reducer;
