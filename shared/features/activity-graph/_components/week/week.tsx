import { useMemo } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { getWeekNumber } from "../../utils/getWeekNumber";
import { ActivityGraphWeekProps } from "./week.types";

export function Week({ week, data }: ActivityGraphWeekProps) {
  const weekNumber = useMemo(() => getWeekNumber(week.startDate), [week]);

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
          "border-card-border-light bg-spaceBlue-800 flex h-6 w-6 flex-row items-center justify-center rounded-[2px] border",
          {
            "bg-spaceBlue-800": data?.level === 1,
            "bg-spacePurple-800": data?.level === 2,
            "bg-spacePurple-700": data?.level === 3,
            "bg-spacePurple-500": data?.level === 4,
          }
        )}
      >
        {data?.icon ? <Icon {...data.icon} classNames={{ base: "h-4 w-4" }} /> : null}
      </div>
    </Tooltip>
  );
}
