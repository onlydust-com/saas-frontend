import { Badge } from "@/design-system/atoms/badge";

import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";

import { CellBadgeProps } from "./cell-badge.types";

export function CellBadge({ items }: CellBadgeProps) {
  if (!items?.length) {
    return <CellEmpty />;
  }

  return (
    <div className="flex items-center gap-xs">
      {items.map(({ content, badgeProps }, index) => (
        <Badge
          key={`cell-badge-${index}`}
          size="md"
          classNames={{
            base: "overflow-visible",
            label: "overflow-visible whitespace-nowrap text-clip",
          }}
          {...badgeProps}
        >
          {content}
        </Badge>
      ))}
    </div>
  );
}
