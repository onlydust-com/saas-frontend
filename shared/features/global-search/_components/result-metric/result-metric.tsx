import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { ResultMetricProps } from "./result-metric.types";

export function ResultMetric({ icon, count }: ResultMetricProps) {
  return (
    <div className="flex items-center gap-sm">
      <Icon component={icon} size="xxs" classNames={{ base: "text-foreground-quinary" }} />
      <Typo size="xs" weight="medium">
        {count}
      </Typo>
    </div>
  );
}
