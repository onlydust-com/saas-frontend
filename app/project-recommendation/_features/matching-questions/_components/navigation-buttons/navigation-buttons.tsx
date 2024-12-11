import { Button } from "@/design-system/atoms/button/variants/button-default";

import { type NavigationButtonsProps } from "./navigation-buttons.types";

export function NavigationButtons({
  onNext,
  onBack,
  isFirstQuestion,
  isLastQuestion,
  isSavingAnswers,
}: NavigationButtonsProps) {
  return (
    <div className="mt-xl flex justify-between">
      <Button
        onClick={onBack}
        isDisabled={isFirstQuestion || isSavingAnswers}
        variant="secondary"
        translate={{ token: "common:back" }}
      />
      <Button
        onClick={onNext}
        isLoading={isSavingAnswers}
        translate={{ token: isLastQuestion ? "common:finish" : "common:next" }}
      />
    </div>
  );
}
