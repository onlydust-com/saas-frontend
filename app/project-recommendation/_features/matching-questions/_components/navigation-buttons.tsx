"use client";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isSavingAnswers: boolean;
}

export function NavigationButtons({
  onNext,
  onBack,
  isFirstQuestion,
  isLastQuestion,
  isSavingAnswers,
}: NavigationButtonsProps) {
  return (
    <div className="mt-xl flex justify-between">
      <Button onClick={onBack} isDisabled={isFirstQuestion} variant="secondary">
        <Typo>Back</Typo>
      </Button>
      <Button onClick={onNext} isLoading={isSavingAnswers}>
        <Typo>{isLastQuestion ? "Finish" : "Next"}</Typo>
      </Button>
    </div>
  );
}
