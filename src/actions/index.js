export const checkAnswers = answers => ({
  type: 'CHECK',
  payload: answers,
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
