"use client";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export function NavigationButtons({ onNext, onBack, isFirstQuestion, isLastQuestion }: NavigationButtonsProps) {
  return (
    <div className="mt-xl flex justify-between">
      <Button onClick={onBack} isDisabled={isFirstQuestion} theme="primary" variant="secondary">
        <Typo>Back</Typo>
      </Button>
      <Button onClick={onNext} isDisabled={isLastQuestion} theme="primary">
        <Typo>{isLastQuestion ? "Finish" : "Next"}</Typo>
      </Button>
    </div>
  );
}
