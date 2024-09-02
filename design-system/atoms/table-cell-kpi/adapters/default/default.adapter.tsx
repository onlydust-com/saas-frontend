import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon, IconPort } from "@/design-system/atoms/icon";
import { TableCellKpiPort } from "@/design-system/atoms/table-cell-kpi";

import { cn } from "@/shared/helpers/cn";

import { TableCellKpiDefaultVariants } from "./default.variants";

export function TableCellKpiDefaultAdapter({ classNames, trend, inverted, children }: TableCellKpiPort) {
  const slots = TableCellKpiDefaultVariants({ trend, inverted });

  const iconNames: Record<NonNullable<typeof trend>, IconPort> = {
    UP: { component: TrendingUp },
    DOWN: { component: TrendingDown },
    STABLE: { component: ArrowRight },
  };

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      <Badge endContent={trend ? <Icon {...iconNames[trend]} classNames={{ base: slots.icon() }} /> : null} size={"md"}>
        {children}
      </Badge>
    </div>
  );
}
