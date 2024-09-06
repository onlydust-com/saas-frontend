import { ProgressBar } from "@/design-system/atoms/progress-bar";

import { cn } from "@/shared/helpers/cn";

import { StepperPort } from "../../stepper.types";
import { StepperDefaultVariants } from "./default.variants";

export function StepperDefaultAdapter({ classNames, htmlProps, steps }: StepperPort) {
  const slots = StepperDefaultVariants();

  return (
    <div {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      {steps.map((step, index) => (
        <ProgressBar key={`step-${index}`} value={step.value} />
      ))}
    </div>
  );
}
