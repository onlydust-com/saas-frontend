import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";

import { ResultMetricProps } from "./result-metric.types";

export function ResultMetric({ icon, count, label }: ResultMetricProps) {
  return (
    <div className="flex items-center gap-sm">
      {icon ? <Icon component={icon} size="xxs" classNames={{ base: "text-foreground-quinary" }} /> : null}
      <Typo size="xs" weight="medium">
        {count}
      </Typo>
      {label && <Typo size="xs" weight="medium" translate={label} />}
    </div>
  );
}
