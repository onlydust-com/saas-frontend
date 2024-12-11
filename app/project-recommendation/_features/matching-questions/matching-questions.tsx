"use client";

import { NavigationButtons } from "./components/navigation-buttons";
import { QuestionCard } from "./components/question-card";
import { useMatchingQuestions } from "./matching-questions.hooks";

export function MatchingQuestions() {
  const {
    isLoading,
    currentQuestion,
    selectedAnswers,
    isLastQuestion,
    isFirstQuestion,
    handleNext,
    handleBack,
    handleAnswerSelection,
  } = useMatchingQuestions();

  if (isLoading || !currentQuestion) {
    return null;
  }

  return (
    <div className="flex flex-col gap-xl">
      <QuestionCard
        question={currentQuestion}
        selectedAnswers={selectedAnswers}
        onAnswerSelect={handleAnswerSelection}
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
