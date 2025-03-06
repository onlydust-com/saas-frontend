import { CategoriesFilter } from "@/shared/filters/categories-filter/categories-filter";
import { EcosystemsFilter } from "@/shared/filters/ecosystems-filter/ecosystems-filter";
import { LanguagesFilter } from "@/shared/filters/languages-filter/languages-filter";
import { ProjectTagsFilter } from "@/shared/filters/project-tags-filter/project-tags-filter";
import { Input } from "@/shared/ui/input";

import { useBrowseProjectsContext } from "./browse-projects-filters.context";

export function BrowseProjectsFilters() {
  const {
    filters: { values: filters, set },
  } = useBrowseProjectsContext();

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div className="flex-[1]">
        <Input
          placeholder="Search"
          className="w-full"
          value={filters.search}
          onChange={e => set({ search: e.target.value })}
        />
      </div>
      <div className="flex flex-[3] flex-row items-center justify-end gap-2">
        <LanguagesFilter languagesIds={filters.languageIds} onSelect={languageIds => set({ languageIds })} />
        <EcosystemsFilter ecosystemsIds={filters.ecosystemIds} onSelect={ecosystemIds => set({ ecosystemIds })} />
        <CategoriesFilter categoriesIds={filters.categoryIds} onSelect={categoryIds => set({ categoryIds })} />
        <ProjectTagsFilter tags={filters.tags} onSelect={tags => set({ tags })} />
      </div>
    </div>
  );
}
