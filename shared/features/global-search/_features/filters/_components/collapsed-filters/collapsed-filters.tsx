import { X } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useGlobalSearch } from "../../../../global-search.context";

export function CollapsedFilters() {
  const { onClearAllFilters, filters, onOpenFilterChange } = useGlobalSearch();

  const openFilter = () => onOpenFilterChange(true);

  const otherFilters = [...(filters.languages ?? []), ...(filters.ecosystems ?? []), ...(filters.categories ?? [])];

  return (
    <div className="relative flex w-full flex-row items-center justify-between gap-1 border-b border-b-border-primary px-6 py-4">
      <div className="flex flex-row items-center justify-start gap-2">
        {filters.type && (
          <Badge
            translate={{ token: `features:globalSearch.filters.type.${filters.type}` }}
            classNames={{ base: "cursor-pointer" }}
            htmlProps={{ onClick: openFilter }}
          />
        )}
        {otherFilters?.map(filter => (
          <Badge key={filter} htmlProps={{ onClick: openFilter }} classNames={{ base: "cursor-pointer" }}>
            {filter}
          </Badge>
        ))}
      </div>
      <Button
        variant="tertiary"
        size="sm"
        startIcon={{ component: X }}
        translate={{ token: "features:globalSearch.filters.clearAll" }}
        onClick={onClearAllFilters}
      />
    </div>
  );
}
