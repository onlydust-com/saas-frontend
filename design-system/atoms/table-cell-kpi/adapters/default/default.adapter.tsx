import { ArrowDown, ArrowRight, ArrowUp, LucideIcon } from "lucide-react";

import { TableCellKpiPort } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TableCellKpiDefaultVariants } from "./default.variants";

export function TableCellKpiDefaultAdapter({ classNames, trend, inverted, children }: TableCellKpiPort) {
  const slots = TableCellKpiDefaultVariants({ trend, inverted });

  const iconNames: Record<NonNullable<typeof trend>, LucideIcon> = {
    UP: ArrowUp,
    DOWN: ArrowDown,
    STABLE: ArrowRight,
  };

  const Icon = trend ? iconNames[trend] : undefined;

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Typo size={"s"} weight={"medium"} color={"text-2"}>
        {children}
      </Typo>
      {trend && Icon ? <Icon size={16} className={cn(slots.icon())} /> : null}
    </div>
  );
}
