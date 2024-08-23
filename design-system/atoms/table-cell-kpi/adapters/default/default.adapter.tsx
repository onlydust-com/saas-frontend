import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

import { Icon, IconPort } from "@/design-system/atoms/icon";
import { TableCellKpiPort } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { TableCellKpiDefaultVariants } from "./default.variants";

export function TableCellKpiDefaultAdapter({ classNames, trend, inverted, children }: TableCellKpiPort) {
  const slots = TableCellKpiDefaultVariants({ trend, inverted });

  const iconNames: Record<NonNullable<typeof trend>, IconPort> = {
    UP: { component: ArrowUp },
    DOWN: { component: ArrowDown },
    STABLE: { component: ArrowRight },
  };

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Typo size={"s"} weight={"medium"} color={"text-2"}>
        {children}
      </Typo>
      {trend ? <Icon {...iconNames[trend]} classNames={{ base: slots.icon() }} /> : null}
    </div>
  );
}
