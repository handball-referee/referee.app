import { IQABundle } from "../model";

export async function loadQuestions(language: string, version: string): Promise<IQABundle> {
  const response = await fetch(`/data/questions/${version}/${language}.json`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const questions = await response.json();

  const answerResponse = await fetch(`/data/questions/${version}/answers.json`);
  if (!answerResponse.ok) {
    throw new Error(await answerResponse.text());
  }
  const answers = await answerResponse.json();

  return {
    questions,
    answers,
  };
}
