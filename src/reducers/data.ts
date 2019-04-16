import u from "updeep";
import Answers from "../data/answers.json";
import { DataActions } from "../actions/data";
import { IQuestion } from "../model";

const ids: string[] = [];
for (let i = 0; i < Answers.length; i += 1) {
  ids.push(Answers[i].id);
}

const getRandomId = () => ids[Math.floor(Math.random() * ids.length)];

export interface IDataState {
  questions: { [lang: string]: { [id: string]: IQuestion } };
  loaded: { [id: string]: boolean };
  loading: { [id: string]: boolean };
  currentQuestion: string;
}

const initialState: IDataState = {
  questions: {},
  loaded: {},
  loading: {},
  currentQuestion: getRandomId(),
};

const reducer = (state = initialState, action: DataActions) => {
  switch (action.type) {
    case "LOAD_QUESTIONS_STARTED": {
      const { lang } = action.meta;
      return u({
        loading: {
          [lang]: true,
        },
      }, state);
    }
    case "LOAD_QUESTIONS_SUCCESS": {
      const { lang } = action.meta;
      return u({
        loading: {
          [lang]: false,
        },
        loaded: {
          [lang]: true,
        },
        questions: {
          [lang]: action.payload.reduce((prev: { [id: string]: IQuestion }, curr: IQuestion) => {
            const q = prev;
            q[curr.id] = curr;
            return q;
          }, {}),
        },
      }, state);
    }
    case "LOAD_QUESTIONS_ERROR": {
      const { lang } = action.meta;
      return u({
        loading: {
          [lang]: false,
        },
      }, state);
    }
    case "NEXT":
      return u({
        currentQuestion: u.constant(getRandomId()),
      }, state);
    default:
      return state;
  }
};

export default reducer;
