import u from 'updeep';
import Answers from '../data/answers.json';

const ids = [];
for (let i = 0; i < Answers.length; i++) {
  ids.push(Answers[i].id);
}

const getRandomId = () => ids[Math.floor(Math.random() * ids.length)];

const initialState = {
  questions: {},
  loaded: {},
  loading: {},
  currentQuestion: getRandomId(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_QUESTIONS':
      break;
    case 'LOAD_QUESTIONS_STARTED': {
      const { lang } = action.meta;
      return u({
        loading: {
          [lang]: true,
        },
      }, state);
    }
    case 'LOAD_QUESTIONS_SUCCESS': {
      const { lang } = action.meta;
      return u({
        loading: {
          [lang]: false,
        },
        loaded: {
          [lang]: false,
        },
        questions: {
          [lang]: action.payload.reduce((prev, curr) => {
            const q = prev;
            q[curr.id] = curr;
            return q;
          }, {}),
        },
      }, state);
    }
    case 'LOAD_QUESTIONS_ERROR': {
      const { lang } = action.meta;
      return u({
        loading: {
          [lang]: false,
        },
      }, state);
    }
    case 'NEXT':
      return u({
        currentQuestion: u.constant(getRandomId()),
      }, state);
    default:
      return state;
  }
  return state;
};

export default reducer;
