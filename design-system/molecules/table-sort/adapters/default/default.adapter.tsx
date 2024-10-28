import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

import { Icon, LucideIconPort } from "@/design-system/atoms/icon";

import { cn } from "@/shared/helpers/cn";

import { SortDirection, TableSortPort } from "../../table-sort.types";
import { TableSortDefaultVariants } from "./default.variants";

export function TableSortDefaultAdapter({
  classNames,
  direction = SortDirection.ASC,
  onDirectionChange,
  isSelected,
}: TableSortPort) {
  const slots = TableSortDefaultVariants({ isSelected });

  const sortIcons: Record<SortDirection, LucideIconPort> = {
    ASC: { component: ArrowDownWideNarrow },
    DESC: { component: ArrowUpNarrowWide },
  };

  function handleClick() {
    if (isSelected) {
      onDirectionChange(direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
    } else {
      onDirectionChange(direction);
    }
  }

  return (
    <button className={cn(slots.base(), classNames?.base)} onClick={handleClick}>
      <Icon component={sortIcons[direction].component} size="xxs" />
    </button>
  );
}
