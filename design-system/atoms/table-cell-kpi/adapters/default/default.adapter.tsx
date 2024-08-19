import { Icon, IconPort } from "@/design-system/atoms/icon";
import { TableCellKpiPort } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TableCellKpiDefaultVariants } from "./default.variants";

export function TableCellKpiDefaultAdapter({ classNames, state, children }: TableCellKpiPort) {
  const slots = TableCellKpiDefaultVariants({ state });

  const iconNames: Record<NonNullable<typeof state>, IconPort["name"]> = {
    positive: "ri-arrow-up-line",
    negative: "ri-arrow-down-line",
    neutral: "ri-arrow-right-line",
  };

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Typo size={"s"} weight={"medium"} color={"text-2"}>
        {children}
      </Typo>
      {state ? <Icon name={iconNames[state]} className={cn(slots.icon())} /> : null}
    </div>
  );
}
