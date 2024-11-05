import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

import { Icon, LucideIconPort } from "@/design-system/atoms/icon";

import { cn } from "@/shared/helpers/cn";

import { SortDirection, TableSortPort } from "../../table-sort.types";
import { TableSortDefaultVariants } from "./default.variants";

export function TableSortDefaultAdapter({
  classNames,
  direction = SortDirection.ASC,
  onClick,
  isSorted,
}: TableSortPort) {
  const slots = TableSortDefaultVariants({ isSorted });

  const sortIcons: Record<SortDirection, LucideIconPort> = {
    ASC: { component: ArrowDownWideNarrow },
    DESC: { component: ArrowUpNarrowWide },
  };

  return (
    <button className={cn(slots.base(), classNames?.base)} onClick={onClick}>
      <Icon component={sortIcons[direction].component} size="xxs" />
    </button>
  );
}
