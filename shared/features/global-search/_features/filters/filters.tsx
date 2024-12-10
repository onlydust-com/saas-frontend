import { SearchRessourceType } from "@/core/domain/search/search-contract.types";

import { useGlobalSearch } from "../../global-search.context";
import { CollapsedFilters } from "./_components/collapsed-filters/collapsed-filters";
import { ProjectFilters } from "./_components/project-filters/project-filters";
import { TypeFilters } from "./_components/type-filters/type-filters";

export function Filters() {
  const { isOpenFilter, onClearAllFilters, filters } = useGlobalSearch();

  if (!isOpenFilter && !filters.type) {
    return null;
  }

  if (!isOpenFilter) {
    return <CollapsedFilters />;
  }

  return (
    <>
      <TypeFilters onClearAll={onClearAllFilters} />
      {filters.type === SearchRessourceType.PROJECT && <ProjectFilters />}
    </>
  );
}
