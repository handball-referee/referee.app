import u from 'updeep';
import Answers from '../data/answers.json';

const questions = Answers.reduce((prev, curr) => {
  const q = prev;
  q[curr.id] = {
    ...curr,
    testAsked: 0,
    testCorrect: 0,
    testPercentageCorrect: 0,
    testWrong: 0,
    testPercentageWrong: 0,
  };
  return q;
}, {});

const initialState = {
  questions,
  correct: 0,
  wrong: 0,
  correctPercentage: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK': {
      const answers = action.payload;
      const question = state.questions[action.meta.question];

      if (
        question.correct.length === answers.length
        && question.correct.every(a => answers.indexOf(a) > -1)
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
    case 'RESET':
      return u({
        correct: 0,
        wrong: 0,
        percentage: 0,
      }, state);
    default:
      return state;
  }
};

export default reducer;
