"use client";

import { useState } from "react";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import type { MatchingQuestionsState } from "./matching-questions.types";

export function useMatchingQuestions() {
  const { data: matchingQuestions, isLoading } = RecoReactQueryAdapter.client.useGetMatchingQuestions({
    queryParams: {
      v: "REPLACE_WITH_ALGO_ID",
    },
  });

  const [state, setState] = useState<MatchingQuestionsState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
  });

  const currentQuestion = matchingQuestions?.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === (matchingQuestions?.questions.length ?? 0) - 1;
  const isFirstQuestion = state.currentQuestionIndex === 0;

  const handleNext = () => {
    if (!isLastQuestion) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const handleAnswerSelection = (answerId: string) => {
    setState(prev => {
      const currentAnswers = prev.selectedAnswers[prev.currentQuestionIndex] || [];

      return {
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [prev.currentQuestionIndex]: currentQuestion?.multipleChoice
            ? currentAnswers.includes(answerId)
              ? currentAnswers.filter(id => id !== answerId)
              : [...currentAnswers, answerId]
            : [answerId],
        },
      };
    });
  };

  return {
    isLoading,
    currentQuestion,
    selectedAnswers: state.selectedAnswers[state.currentQuestionIndex] || [],
    isLastQuestion,
    isFirstQuestion,
    handleNext,
    handleBack,
    handleAnswerSelection,
  };
}
