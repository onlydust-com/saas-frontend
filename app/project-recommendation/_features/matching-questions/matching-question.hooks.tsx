import { useEffect, useState } from "react";
import { toast } from "sonner";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import { Translate } from "@/shared/translation/components/translate/translate";

import { Answer, MatchingQuestionsState } from "./matching-questions.types";

export function useMatchingQuestions() {
  const { data: matchingQuestions, isLoading: isLoadingMatchingQuestions } =
    RecoReactQueryAdapter.client.useGetMatchingQuestions({
      queryParams: {
        v: "REPLACE_WITH_POSTHOG_ALGO_ID",
      },
    });

  const [questionState, setQuestionState] = useState<MatchingQuestionsState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
  });

  const currentQuestion = matchingQuestions?.questions[questionState.currentQuestionIndex];
  const isLastQuestion = questionState.currentQuestionIndex === (matchingQuestions?.questions.length ?? 0) - 1;
  const isFirstQuestion = questionState.currentQuestionIndex === 0;
  const currentQuestionId = currentQuestion?.id;

  const { mutate: saveAnswers, isPending: isSavingAnswers } = RecoReactQueryAdapter.client.useSaveMatchingQuestions({
    pathParams: {
      questionId: currentQuestionId ?? "",
    },
    options: {
      onSuccess: () => {
        if (!isLastQuestion) {
          setQuestionState(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
          }));
        }

        toast.success(<Translate token="projectRecommendation:details.toast.success" />);
      },
      onError: () => {
        toast.error(<Translate token="projectRecommendation:details.toast.error" />);
      },
    },
  });

  useEffect(() => {
    if (matchingQuestions?.questions && currentQuestionId) {
      setQuestionState(prev => ({
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [Number(currentQuestionId)]: matchingQuestions.questions[questionState.currentQuestionIndex].answers.filter(
            answer => answer.chosen
          ),
        },
      }));
    }
  }, [matchingQuestions?.questions, currentQuestionId]);

  function handleNext() {
    saveAnswers({
      answerIndexes: questionState.selectedAnswers[Number(currentQuestionId)].map(answer => answer.index ?? 0),
    });
  }

  function handleBack() {
    if (!isFirstQuestion) {
      setQuestionState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  }

  function handleAnswerSelect(answer: Answer) {
    if (!currentQuestion) return;

    setQuestionState(prev => {
      const currentAnswers = prev.selectedAnswers[Number(currentQuestion.id)] ?? [];

      if (currentQuestion.multipleChoice) {
        const existingAnswerIndex = currentAnswers.findIndex(a => a.index === answer.index);

        if (existingAnswerIndex >= 0) {
          return {
            ...prev,
            selectedAnswers: {
              ...prev.selectedAnswers,
              [Number(currentQuestion.id)]: currentAnswers.filter((_, i) => i !== existingAnswerIndex),
            },
          };
        } else {
          return {
            ...prev,
            selectedAnswers: {
              ...prev.selectedAnswers,
              [Number(currentQuestion.id)]: [...currentAnswers, { ...answer, chosen: true }],
            },
          };
        }
      } else {
        return {
          ...prev,
          selectedAnswers: {
            ...prev.selectedAnswers,
            [Number(currentQuestion.id)]: [{ ...answer, chosen: true }],
          },
        };
      }
    });
  }

  return {
    isLoadingMatchingQuestions,
    isSavingAnswers,
    currentQuestion,
    isLastQuestion,
    isFirstQuestion,
    handleNext,
    handleBack,
    handleAnswerSelect,
    selectedAnswers: questionState.selectedAnswers,
    currentQuestionIndex: questionState.currentQuestionIndex,
    totalQuestions: matchingQuestions?.questions.length ?? 0,
  };
}
