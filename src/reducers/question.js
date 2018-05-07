import u from 'updeep';
import Questions from '../data/questions.json';

const ids = [];
const questions = Questions.reduce((prev, curr) => {
  const q = prev;
  q[curr.id] = {
    ...curr,
    testAsked: 0,
    testCorrect: 0,
    testPercentageCorrect: 0,
    testWrong: 0,
    testPercentageWrong: 0,
  };
  ids.push(curr.id);
  return q;
}, {});

const getRandomId = () => ids[Math.floor(Math.random() * ids.length)];

const initialState = {
  questions,
  currentQuestion: questions[getRandomId()],
  correct: 0,
  wrong: 0,
  correctPercentage: 0,
  order: 'asc',
  orderBy: 'id',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK': {
      const answers = action.payload;
      const question = state.currentQuestion;

      if (
        question.correct.length === answers.length &&
        question.correct.every(a => answers.indexOf(a) > -1)
      ) {
        const correct = state.correct + 1;
        const total = correct + state.wrong;
        const correctPercentage = Math.round((100 / total) * correct);
        const testAsked = question.testAsked + 1;
        const testCorrect = question.testCorrect + 1;
        const testPercentageCorrect = Math.round((100 / testAsked) * testCorrect);
        const testPercentageWrong = Math.round((100 / testAsked) * question.testWrong);
        return u({
          correct,
          correctPercentage,
          questions: {
            [question.id]: {
              testAsked,
              testCorrect,
              testPercentageCorrect,
              testPercentageWrong,
            },
          },
        }, state);
      }
      const wrong = state.wrong + 1;
      const total = wrong + state.correct;
      const correctPercentage = Math.round((100 / total) * state.correct);
      const testAsked = question.testAsked + 1;
      const testWrong = question.testWrong + 1;
      const testPercentageCorrect = Math.round((100 / testAsked) * question.testCorrect);
      const testPercentageWrong = Math.round((100 / testAsked) * testWrong);
      return u({
        wrong,
        correctPercentage,
        questions: {
          [question.id]: {
            testAsked,
            testWrong,
            testPercentageCorrect,
            testPercentageWrong,
          },
        },
      }, state);
    }
    case 'NEXT':
      return u({
        currentQuestion: u.constant(questions[getRandomId()]),
      }, state);
    case 'RESET':
      return u({
        correct: 0,
        wrong: 0,
        percentage: 0,
      }, state);
    case 'SORT': {
      let { orderBy, order } = state;
      if (action.payload === orderBy) {
        order = order === 'asc' ? 'desc' : 'asc';
      } else {
        orderBy = action.payload;
        order = 'asc';
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

export const getQuestions = (state) => {
  const q = ids.map(id => state.questions[id]);
  const { order, orderBy } = state;
  const result = order === 'desc'
    ? q.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : q.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

  return result;
};
export const getCurrentQuestion = state => state.currentQuestion;
export const getCorrect = state => state.correct;
export const getWrong = state => state.wrong;
export const getPercentage = state => state.correctPercentage;
export const getOrder = state => state.order;
export const getOrderBy = state => state.orderBy;

export default reducer;
