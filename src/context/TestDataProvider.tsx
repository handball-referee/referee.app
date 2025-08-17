/* eslint-disable no-param-reassign */
import React, {
  FunctionComponent, ReactNode, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { useTranslation } from "react-i18next";
import { getTestDataContext, TestDataContextValue } from "./TestDataContext";
import Loading from "../components/Loading";
import TestDataManager, { AVAILABLE_LANGUAGES } from "../model/TestDataManager";
import Question from "../model/Question";

interface TestDataProviderProps {
  children: ReactNode;
}

const TestDataProvider: FunctionComponent<TestDataProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question|undefined>();
  const [asked, setAsked] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const [reveal, setReveal] = useState(false);
  const [version, setVersion] = useState<keyof typeof AVAILABLE_LANGUAGES>("ihf_07_2025");
  const [languageMissing, setLanguageMissing] = useState(false);
  const manager = useRef<TestDataManager>(new TestDataManager());
  const { i18n: { language } } = useTranslation();

  // Load questions
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        setQuestion(await manager.current.initialize(language, version));
        setAsked(manager.current.asked);
        setCorrect(manager.current.correct);
        setLanguageMissing(manager.current.languageMissing);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [language, version]);

  const nextQuestion = useCallback(() => {
    setQuestion(manager.current.next());
    setReveal(false);
    setChecked([]);
  }, []);

  const checkAnswers = useCallback(async (options: string[]) => {
    const result = manager.current.checkAnswer(options);

    setAsked(manager.current.asked);
    setCorrect(manager.current.correct);
    setChecked(options);
    setReveal(true);

    return result;
  }, []);

  const resetStats = useCallback(async () => {
    await manager.current!.reset();
    setAsked(manager.current.asked);
    setCorrect(manager.current.correct);
  }, []);

  const ctx = useMemo<TestDataContextValue>(() => ({
    checkAnswers,
    nextQuestion,
    question,
    asked,
    correct,
    checked,
    reveal,
    data: manager.current.data,
    languageMissing,
    version,
    setVersion,
    resetStats,
  }), [
    checkAnswers,
    nextQuestion,
    question, asked,
    correct, checked,
    reveal,
    manager.current.data,
    languageMissing,
    version,
    resetStats,
  ]);

  const TestDataContext = getTestDataContext();

  let content;
  if (loading) {
    content = (
      <Loading />
    );
  } else {
    content = children;
  }

  return (
    <TestDataContext.Provider value={ctx}>
      {content}
    </TestDataContext.Provider>
  );
};

export default TestDataProvider;
