import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { ProjectTag } from "@/core/domain/project/project.types";

import { useUpdateMultipleSearchParams } from "@/shared/hooks/router/use-update-search-params";

import {
  BrowseProjectsContextFilter,
  BrowseProjectsContextProviderProps,
  BrowseProjectsContextQueryParams,
  BrowseProjectsContextReturn,
  DEFAULT_FILTER,
} from "./browse-projects-filters.types";

const BrowseProjectsContext = createContext<BrowseProjectsContextReturn>({
  filters: {
    values: DEFAULT_FILTER,
    isCleared: true,
    set: () => null,
    clear: () => null,
    count: 0,
  },
  queryParams: {},
});

function getFilterFromSearchParams(getSearchParams: URLSearchParams) {
  const sortByParam = getSearchParams.get("sortBy");
  const tagsParam = getSearchParams.get("tags");
  const languageIdsParam = getSearchParams.get("languageIds");
  const ecosystemIdsParam = getSearchParams.get("ecosystemIds");
  const categoryIdsParam = getSearchParams.get("categoryIds");
  const searchParam = getSearchParams.get("search");

  if (!sortByParam && !tagsParam && !languageIdsParam && !ecosystemIdsParam && !categoryIdsParam && !searchParam) {
    return DEFAULT_FILTER;
  }

  return {
    sortBy: sortByParam ?? undefined,
    tags: tagsParam ? (tagsParam.split(",") as ProjectTag[]) : [],
    languageIds: languageIdsParam ? languageIdsParam.split(",") : [],
    ecosystemIds: ecosystemIdsParam ? ecosystemIdsParam.split(",") : [],
    categoryIds: categoryIdsParam ? categoryIdsParam.split(",") : [],
    search: searchParam ?? undefined,
  };
}

export function BrowseProjectsContextProvider({ children }: BrowseProjectsContextProviderProps) {
  const { updateMultipleSearchParams, searchParams: getSearchParams } = useUpdateMultipleSearchParams();
  const [filters, setFilters] = useState<BrowseProjectsContextFilter>(getFilterFromSearchParams(getSearchParams));
  const [queryParams, setQueryParams] = useState<BrowseProjectsContextQueryParams>({});
  const [debouncedQueryParams, setDebouncedQueryParams] = useState<BrowseProjectsContextQueryParams>(queryParams);

  useEffect(() => {
    const sortByParam = getSearchParams.get("sortBy");
    const tagsParam = getSearchParams.get("tags");
    const languageIdsParam = getSearchParams.get("languageIds");
    const ecosystemIdsParam = getSearchParams.get("ecosystemIds");
    const categoryIdsParam = getSearchParams.get("categoryIds");
    const searchParam = getSearchParams.get("search");

    setFilter({
      sortBy: sortByParam ?? undefined,
      tags: tagsParam ? (tagsParam.split(",") as ProjectTag[]) : [],
      languageIds: languageIdsParam ? languageIdsParam.split(",") : [],
      ecosystemIds: ecosystemIdsParam ? ecosystemIdsParam.split(",") : [],
      categoryIds: categoryIdsParam ? categoryIdsParam.split(",") : [],
      search: searchParam ?? undefined,
    });
  }, [getSearchParams]);

  useDebounce(
    () => {
      setDebouncedQueryParams(queryParams);
    },
    300,
    [queryParams]
  );

  const isCleared = useMemo(() => JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTER), [filters]);

  const filtersCount = useMemo(() => {
    return filters.languageIds.length + filters.ecosystemIds.length + filters.categoryIds.length;
  }, [filters]);

  function handleQueryParams(filters: BrowseProjectsContextFilter) {
    setQueryParams({
      tags: filters.tags.length ? filters.tags : undefined,
      languageIds: filters.languageIds.length ? filters.languageIds : undefined,
      ecosystemIds: filters.ecosystemIds.length ? filters.ecosystemIds : undefined,
      categoryIds: filters.categoryIds.length ? filters.categoryIds : undefined,
      sortBy: filters.sortBy ?? undefined,
      search: filters.search ?? undefined,
    });
  }

  function setFilter(filter: Partial<BrowseProjectsContextFilter>) {
    const newFilters = { ...filters, ...filter };
    setFilters(newFilters);
    handleQueryParams(newFilters);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTER);
    handleQueryParams(DEFAULT_FILTER);
  }

  useEffect(() => {
    const queryParamsToSave: Record<string, string> = {
      ...(debouncedQueryParams.tags && { tags: debouncedQueryParams.tags.join(",") }),
      ...(debouncedQueryParams.languageIds && { languageIds: debouncedQueryParams.languageIds.join(",") }),
      ...(debouncedQueryParams.ecosystemIds && { ecosystemIds: debouncedQueryParams.ecosystemIds.join(",") }),
      ...(debouncedQueryParams.categoryIds && { categoryIds: debouncedQueryParams.categoryIds.join(",") }),
      ...(debouncedQueryParams.sortBy && { sortBy: debouncedQueryParams.sortBy }),
      ...(debouncedQueryParams.search && { search: debouncedQueryParams.search }),
    };

    if (Object.keys(queryParamsToSave).length > 0) {
      updateMultipleSearchParams(queryParamsToSave);
    }
  }, [debouncedQueryParams]);

  return (
    <BrowseProjectsContext.Provider
      value={{
        filters: {
          values: filters,
          isCleared,
          set: setFilter,
          clear: clearFilters,
          count: filtersCount,
        },
        queryParams: debouncedQueryParams,
      }}
    >
      {children}
    </BrowseProjectsContext.Provider>
  );
}

export function useBrowseProjectsContext() {
  const context = useContext(BrowseProjectsContext);

  if (!context) {
    throw new Error("BrowseProjectsContext must be used inside a BrowseProjectsContextProvider");
  }

  return context;
}
