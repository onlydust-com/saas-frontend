import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useFeatureFlagVariant } from "@/shared/hooks/feature-flag/feature-flag.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Answer, MatchingQuestionsState } from "./matching-questions.types";

export function useMatchingQuestions() {
  const router = useRouter();
  const variantValue = useFeatureFlagVariant({
    flagName: "project-recommendation-a-a",
  });

  const { data: matchingQuestions, isLoading: isLoadingMatchingQuestions } =
    RecoReactQueryAdapter.client.useGetMatchingQuestions({
      queryParams: {
        v: variantValue ?? "",
      },
      options: {
        enabled: Boolean(variantValue),
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
        toast.success(<Translate token="projectRecommendation:details.toast.success" />);
        if (!isLastQuestion) {
          setQuestionState(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
          }));
          return;
        }

        router.push(NEXT_ROUTER.projectRecommendation.results.root);
      },
      onError: () => {
        toast.error(<Translate token="projectRecommendation:details.toast.error" />);
      },
    },
  });

  function handleNext() {
    saveAnswers({
      answerIndexes: questionState.selectedAnswers[currentQuestionId ?? ""].map(answer => answer.index ?? 0),
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
      const currentAnswers = prev.selectedAnswers[currentQuestion.id] ?? [];

      if (currentQuestion.multipleChoice) {
        const existingAnswerIndex = currentAnswers.findIndex(a => a.index === answer.index);

        if (existingAnswerIndex >= 0) {
          return {
            ...prev,
            selectedAnswers: {
              ...prev.selectedAnswers,
              [currentQuestion.id]: currentAnswers.filter((_, i) => i !== existingAnswerIndex),
            },
          };
        }
        return {
          ...prev,
          selectedAnswers: {
            ...prev.selectedAnswers,
            [currentQuestion.id]: [...currentAnswers, { ...answer, chosen: true }],
          },
        };
      }

      return {
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [currentQuestion.id]: [{ ...answer, chosen: true }],
        },
      };
    });
  }

  useEffect(() => {
    if (matchingQuestions?.questions && currentQuestionId) {
      setQuestionState(prev => ({
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [currentQuestionId]: matchingQuestions.questions[questionState.currentQuestionIndex].answers.filter(
            answer => answer.chosen
          ),
        },
      }));
    }
  }, [matchingQuestions?.questions, currentQuestionId]);

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
