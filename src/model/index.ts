export interface IQuestion {
  id: string;
  question: string;
  answers: { [key: string]: string };
}

export interface IAnswer {
  id: string;
  correct: string[];
  rule: string[];
}

export interface IStatsAnswer extends IAnswer {
  testAsked: number;
  testCorrect: number;
  testPercentageCorrect: number;
  testWrong: number;
  testPercentageWrong: number;
}
