"use client";

import { useState } from "react";

import { RecoReactQueryAdapter } from "@/core/application/react-query-adapter/reco";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

export function MatchingQuestions() {
  const { data: matchingQuestions, isLoading } = RecoReactQueryAdapter.client.useGetMatchingQuestions({
    queryParams: {
      v: "REPLACE_WITH_ALGO_ID",
    },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});

  if (isLoading || !matchingQuestions?.questions?.length) {
    return null;
  }

  const currentQuestion = matchingQuestions.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === matchingQuestions.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswerSelection = (answerIndex: string) => {
    setSelectedAnswers(prev => {
      const currentAnswers = prev[currentQuestionIndex] || [];

      if (currentQuestion.multipleChoice) {
        return {
          ...prev,
          [currentQuestionIndex]: currentAnswers.includes(answerIndex)
            ? currentAnswers.filter(index => index !== answerIndex)
            : [...currentAnswers, answerIndex],
        };
      }

      return {
        ...prev,
        [currentQuestionIndex]: [answerIndex],
      };
    });
  };

  return (
    <div className="flex flex-col gap-xl">
      <Paper size={"4xl"} classNames={{ base: "flex flex-col gap-lg" }} background={"secondary"}>
        <Typo variant="heading" size="xs">
          {currentQuestion.body}
        </Typo>
        {currentQuestion.description && (
          <Typo color="secondary" size="sm">
            {currentQuestion.description}
          </Typo>
        )}
        <div className="grid grid-cols-2 gap-md">
          {currentQuestion.answers.map(answer => {
            const index = answer.index?.toString() ?? "";
            return (
              <Paper
                key={index}
                size="lg"
                onClick={() => handleAnswerSelection(index)}
                background={"tertiary"}
                hasBorderHover
                border={selectedAnswers[currentQuestionIndex]?.includes(index) ? "brand-primary" : "tertiary"}
              >
                <div className="flex items-center justify-between gap-md">
                  <Typo>{answer.body}</Typo>
                  <Checkbox
                    value={selectedAnswers[currentQuestionIndex]?.includes(index)}
                    onChange={() => handleAnswerSelection(index)}
                  />
                </div>
              </Paper>
            );
          })}
        </div>
      </Paper>

      <div className="mt-xl flex justify-between">
        <Button onClick={handleBack} isDisabled={isFirstQuestion} theme="primary" variant="secondary">
          <Typo>Back</Typo>
        </Button>
        <Button onClick={handleNext} isDisabled={isLastQuestion} theme="primary">
          <Typo>{isLastQuestion ? "Finish" : "Next"}</Typo>
        </Button>
      </div>
    </div>
  );
}
