import { LayoutGrid, X } from "lucide-react";

import { SearchRessourceTypeMapping } from "@/core/domain/search/search-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tag } from "@/design-system/atoms/tag";

import { useGlobalSearch } from "../../../../global-search.context";
import { FilterRow } from "../filter-row/filter-row";
import { TypeFiltersProps } from "./type-filters.types";

export function TypeFilters({ onClearAll }: TypeFiltersProps) {
  const { onFiltersTypeChange, filters, typeFacets } = useGlobalSearch();
  const types = typeFacets?.types ?? [];

  function onTypeChange(type: string) {
    const mappedType = SearchRessourceTypeMapping[type];
    if (!mappedType || mappedType === filters.type) {
      onFiltersTypeChange(undefined);
      return;
    }

    onFiltersTypeChange(mappedType);
  }

  return (
    <div className="relative flex w-full flex-row items-start justify-between gap-1 border-b border-b-border-primary px-6 py-4">
      <FilterRow icon={{ component: LayoutGrid }} label={{ token: "features:globalSearch.filters.type.name" }}>
        {types.map(item => (
          <Tag
            key={item.name}
            onSelect={() => onTypeChange(item.name)}
            isSelected={filters?.type?.includes(SearchRessourceTypeMapping[item.name])}
            endContent={
              <Badge fixedSize={item.count <= 9} size="xxs">
                {item.count}
              </Badge>
            }
          >
            {item.name}
          </Tag>
        ))}
      </FilterRow>
      <Button
        variant="tertiary"
        size="sm"
        startIcon={{ component: X }}
        translate={{ token: "features:globalSearch.filters.clearAll" }}
        onClick={onClearAll}
      />
    </div>
  );
}
