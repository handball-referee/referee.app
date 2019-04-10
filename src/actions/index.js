export const checkAnswers = (question, answers) => ({
  type: 'CHECK',
  payload: answers,
  meta: {
    question,
  },
});

export const nextQuestion = () => ({
  type: 'NEXT',
});

export const reset = () => ({
  type: 'RESET',
});

export const sort = property => ({
  type: 'SORT',
  payload: property,
});

export const loadQuestionsStarted = lang => ({
  type: 'LOAD_QUESTIONS_STARTED',
  meta: {
    lang,
  },
});

export const loadQuestionsSuccess = (payload, lang) => ({
  type: 'LOAD_QUESTIONS_SUCCESS',
  meta: {
    lang,
  },
  payload,
});

export const loadQuestionsError = lang => ({
  type: 'LOAD_QUESTIONS_ERROR',
  meta: {
    lang,
  },
});
