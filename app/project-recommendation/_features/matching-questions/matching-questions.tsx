"use client";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { EmptyState } from "@/shared/components/empty-state/empty-state";

import { NavigationButtons } from "./_components/navigation-buttons/navigation-buttons";
import { QuestionCard } from "./_components/question-card/question-card";
import { QuestionsStepper } from "./_components/questions-stepper/questions-stepper";
import { useMatchingQuestions } from "./matching-question.hooks";

export function MatchingQuestions() {
  const {
    isLoadingMatchingQuestions,
    isSavingAnswers,
    currentQuestion,
    selectedAnswers,
    isLastQuestion,
    isFirstQuestion,
    handleNext,
    handleBack,
    handleAnswerSelect,
    currentQuestionIndex,
    totalQuestions,
  } = useMatchingQuestions();

  if (isLoadingMatchingQuestions) {
    return (
      <Skeleton
        classNames={{
          base: "w-full min-h-[300px]",
        }}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <EmptyState
        titleTranslate={{ token: "projectRecommendation:details.matching-questions.emptyState.title" }}
        descriptionTranslate={{
          token: "projectRecommendation:details.matching-questions.emptyState.description",
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-xl overflow-hidden">
      <QuestionsStepper currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />
      <QuestionCard
        question={currentQuestion}
        selectedAnswers={selectedAnswers[currentQuestion.id] ?? []}
        onAnswerSelect={handleAnswerSelect}
      />
      <NavigationButtons
        onNext={handleNext}
        onBack={handleBack}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        isSavingAnswers={isSavingAnswers}
      />
    </div>
  );
}
