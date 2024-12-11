import { LayoutGrid, X } from "lucide-react";

import { SearchRessourceType } from "@/core/domain/search/search-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tag } from "@/design-system/atoms/tag";

import { useGlobalSearch } from "../../../../global-search.context";
import { FilterRow } from "../filter-row/filter-row";
import { TypeFiltersProps } from "./type-filters.types";

export function TypeFilters({ onClearAll }: TypeFiltersProps) {
  const { onFiltersTypeChange, filters } = useGlobalSearch();

  return (
    <div className="relative flex w-full flex-row items-start justify-between gap-1 border-b border-b-border-primary px-6 py-4">
      <FilterRow icon={{ component: LayoutGrid }} label={{ token: "features:globalSearch.filters.type.name" }}>
        <Tag
          onSelect={() => onFiltersTypeChange(SearchRessourceType.PROJECT)}
          isSelected={filters.type === SearchRessourceType.PROJECT}
          translate={{ token: "features:globalSearch.filters.type.PROJECT" }}
        />
        <Tag
          onSelect={() => onFiltersTypeChange(SearchRessourceType.CONTRIBUTOR)}
          isSelected={filters.type === SearchRessourceType.CONTRIBUTOR}
          translate={{ token: "features:globalSearch.filters.type.CONTRIBUTOR" }}
        />
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
