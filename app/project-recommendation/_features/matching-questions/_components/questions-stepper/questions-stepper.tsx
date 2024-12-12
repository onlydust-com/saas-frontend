import { Stepper } from "@/design-system/molecules/stepper";

import { QuestionsStepperProps } from "./questions-stepper.types";

export function QuestionsStepper({ currentQuestionIndex, totalQuestions }: QuestionsStepperProps) {
  const steps = Array.from({ length: totalQuestions }, (_, index) => ({
    value: index < currentQuestionIndex ? 100 : 0,
  }));

  return <Stepper steps={steps} />;
}
