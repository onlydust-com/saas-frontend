import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ActivityGraphWeekProps } from "./week.types";

export function Week({ week, data }: ActivityGraphWeekProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();
  const weekNumber = useMemo(() => dateKernelPort.getWeekNumber(week.startDate), [week]);

  const tooltipContent = useMemo(
    () => (
      <div className="flex flex-col gap-1">
        <p>
          <Translate token={"features:activityGraph.week"} /> {weekNumber}
        </p>
        {data?.tooltipContent ? <div>{data.tooltipContent}</div> : null}
      </div>
    ),
    [weekNumber, data]
  );
  return (
    <Tooltip content={tooltipContent}>
      <div
        className={cn(
          "flex h-4 w-4 flex-row items-center justify-center rounded-[2px] border border-border-primary bg-background-secondary",
          {
            "bg-utility-brand-crystalizedviolet-500": data?.level === 1,
            "bg-utility-brand-crystalizedviolet-200": data?.level === 2,
            "bg-utility-brand-crystalizedviolet-100": data?.level === 3,
            "bg-utility-brand-crystalizedviolet-50": data?.level === 4,
          }
        )}
      >
        {data?.icon ? <Icon {...data.icon} classNames={{ base: "h-3 w-3" }} /> : null}
      </div>
    </Tooltip>
  );
}
