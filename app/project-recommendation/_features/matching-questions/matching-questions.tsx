"use client";

import { NavigationButtons } from "./_components/navigation-buttons";
import { QuestionCard } from "./_components/question-card";
import { QuestionsStepper } from "./_components/questions-stepper";
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

  if (isLoadingMatchingQuestions || !currentQuestion) {
    return null;
  }

  return (
    <div className="flex flex-col gap-xl">
      <QuestionsStepper currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />
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
        isSavingAnswers={isSavingAnswers}
      />
    </div>
  );
}
