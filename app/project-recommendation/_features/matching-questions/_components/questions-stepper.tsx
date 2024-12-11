import { Stepper } from "@/design-system/molecules/stepper/variants/stepper-default";

interface QuestionsStepperProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function QuestionsStepper({ currentQuestionIndex, totalQuestions }: QuestionsStepperProps) {
  const steps = Array.from({ length: totalQuestions }, (_, index) => ({
    value: index < currentQuestionIndex ? 100 : 0,
  }));

  return <Stepper steps={steps} />;
}
