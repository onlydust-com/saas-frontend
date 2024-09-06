import { ProgressBarLoading } from "@/design-system/atoms/progress-bar";

import { StepperDefaultVariants } from "./adapters/default/default.variants";

export function StepperLoading({ height }: { height?: string | number }) {
  const slots = StepperDefaultVariants();

  return (
    <div className={slots.base()}>
      <ProgressBarLoading width="25%" height={height} />
      <ProgressBarLoading width="25%" height={height} />
      <ProgressBarLoading width="25%" height={height} />
      <ProgressBarLoading width="25%" height={height} />
    </div>
  );
}
