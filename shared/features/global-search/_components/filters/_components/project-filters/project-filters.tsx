import { LayoutGrid } from "lucide-react";

import { FilterRow } from "../filter-row/filter-row";

export function ProjectFilters() {
  return (
    <div className="relative flex w-full flex-col items-start justify-start gap-1 border-b border-b-border-primary px-6 py-4">
      <FilterRow icon={{ component: LayoutGrid }} label={{ token: "features:globalSearch.filters.language.name" }}>
        LANGUAGES
      </FilterRow>
      <FilterRow icon={{ component: LayoutGrid }} label={{ token: "features:globalSearch.filters.ecosystem.name" }}>
        ECOSYSTEMS
      </FilterRow>
      <FilterRow icon={{ component: LayoutGrid }} label={{ token: "features:globalSearch.filters.category.name" }}>
        CATEGORIES
      </FilterRow>
    </div>
  );
}
