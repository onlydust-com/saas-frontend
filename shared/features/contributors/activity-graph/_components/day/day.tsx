import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Tooltip } from "@/design-system/atoms/tooltip";

import { cn } from "@/shared/helpers/cn";
import { Translate } from "@/shared/translation/components/translate/translate";

import { DayProps } from "./day.types";

export function Day({ day }: DayProps) {
  const dateKernel = bootstrap.getDateKernelPort();
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

  // 24 contributions on December 18h.

  return (
    <Tooltip content={tooltipContent}>
      <div
        className={cn(
          "flex h-4 w-4 flex-row items-center justify-center rounded-[2px] border border-border-primary bg-background-secondary"
          // {
          //   "bg-utility-brand-crystalizedviolet-500": data?.level === 1,
          //   "bg-utility-brand-crystalizedviolet-200": data?.level === 2,
          //   "bg-utility-brand-crystalizedviolet-100": data?.level === 3,
          //   "bg-utility-brand-crystalizedviolet-50": data?.level === 4,
          // }
        )}
      >
        {/*{data?.icon ? <Icon {...data.icon} classNames={{ base: "h-3 w-3" }} /> : null}*/}
      </div>
    </Tooltip>
  );
}
