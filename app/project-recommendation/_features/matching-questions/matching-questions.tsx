"use client";

import { NavigationButtons } from "./_components/navigation-buttons";
import { QuestionCard } from "./_components/question-card";
import { useMatchingQuestions } from "./matching-question.hooks";

export function MatchingQuestions() {
  const {
    isLoading,
    currentQuestion,
    selectedAnswers,
    isLastQuestion,
    isFirstQuestion,
    handleNext,
    handleBack,
    handleAnswerSelect,
  } = useMatchingQuestions();

  if (isLoading || !currentQuestion) {
    return null;
  }

  return (
    <div className="flex flex-col gap-xl">
      <QuestionCard
        question={currentQuestion}
        selectedAnswers={selectedAnswers[Number(currentQuestion.id)] ?? []}
        onAnswerSelect={handleAnswerSelect}
      />
      <NavigationButtons
        onNext={handleNext}
        onBack={handleBack}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
}
