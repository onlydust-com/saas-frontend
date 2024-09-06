import { ComponentPropsWithoutRef } from "react";

import { ProgressBarPort } from "@/design-system/atoms/progress-bar";

interface Variants {}

interface ClassNames {
  base: string;
}

interface StepItem extends Pick<ProgressBarPort, "value"> {}

export interface StepperPort extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<"div">;
  classNames?: Partial<ClassNames>;
  steps: StepItem[];
}
