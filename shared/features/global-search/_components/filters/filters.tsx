import { LayoutGrid, X } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tag } from "@/design-system/atoms/tag";

import { useGlobalSearch } from "../../global-search.context";
import { FilterRow } from "../filter-row/filter-row";

export function Filters() {
  const { isOpenFilter } = useGlobalSearch();

  if (!isOpenFilter) {
    return (
      <div
        className={
          "relative flex w-full flex-row items-start justify-between gap-1 border-b border-b-border-primary px-6 py-4"
        }
      >
        <FilterRow icon={{ component: LayoutGrid }} label={{ token: "features:globalSearch.filters.type.name" }}>
          <Tag onSelect={() => {}} isSelected translate={{ token: "features:globalSearch.filters.type.project" }} />
          <Tag onSelect={() => {}} isSelected translate={{ token: "features:globalSearch.filters.type.contributor" }} />
        </FilterRow>
        <Button
          variant={"tertiary"}
          size={"sm"}
          startIcon={{ component: X }}
          translate={{ token: "features:globalSearch.filters.clearAll" }}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className={
          "relative flex w-full flex-row items-start justify-between gap-1 border-b border-b-border-primary px-6 py-4"
        }
      >
        <FilterRow icon={{ component: LayoutGrid }} label={{ token: "features:globalSearch.filters.type.name" }}>
          <Tag onSelect={() => {}} isSelected translate={{ token: "features:globalSearch.filters.type.project" }} />
          <Tag onSelect={() => {}} isSelected translate={{ token: "features:globalSearch.filters.type.contributor" }} />
        </FilterRow>
        <Button
          variant={"tertiary"}
          size={"sm"}
          startIcon={{ component: X }}
          translate={{ token: "features:globalSearch.filters.clearAll" }}
        />
      </div>
      <div
        className={
          "relative flex w-full flex-col items-start justify-start gap-1 border-b border-b-border-primary px-6 py-4"
        }
      >
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
    </>
  );
}
