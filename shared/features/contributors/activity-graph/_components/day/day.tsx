import { Medal } from "lucide-react";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Icon } from "@/design-system/atoms/icon";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { activityGraphHooks } from "@/shared/features/contributors/activity-graph/activity-graph.hooks";
import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { DayProps } from "./day.types";

export function Day({ day, data: _data, levelRange }: DayProps) {
  const dateKernel = bootstrap.getDateKernelPort();
  const data = activityGraphHooks.useGetData(_data, day);

  const contributionCount = useMemo(
    () =>
      (data?.rewardCount || 0) + (data?.codeReviewCount || 0) + (data?.issueCount || 0) + (data?.pullRequestCount || 0),
    [data]
  );

  const level = activityGraphHooks.useGetLevel(contributionCount, levelRange);

  const tooltipContent = useMemo(
    () => (
      <div className="flex flex-col gap-1">
        <Translate
          token={"features:contributorActivityGraph.contributions"}
          count={0}
          values={{ date: dateKernel.format(day, "MMMM d") }}
        />
      </div>
    ),
    [day]
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className={cn(
          "flex h-4 w-4 flex-row items-center justify-center rounded-[2px] border border-border-primary bg-background-secondary",
          {
            "bg-utility-brand-crystalizedviolet-500": level === 1,
            "bg-utility-brand-crystalizedviolet-200": level === 2,
            "bg-utility-brand-crystalizedviolet-100": level === 3,
            "bg-utility-brand-crystalizedviolet-50": level === 4,
          }
        )}
      >
        {data?.rewardCount ? <Icon component={Medal} classNames={{ base: "h-3 w-3" }} /> : null}
      </div>
    </Tooltip>
  );
}
