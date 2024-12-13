"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { SearchReactQueryAdapter } from "@/core/application/react-query-adapter/search";
import { SearchDto } from "@/core/domain/search/dto/search-dto";
import { SearchItemInterface } from "@/core/domain/search/models/search-item-model";
import { SearchFacet, SearchRessourceType } from "@/core/domain/search/models/search.types";
import { SearchModel } from "@/core/domain/search/search-contract.types";

// Define types for filters and context
interface Filters {
  type?: SearchRessourceType;
  languages?: string[];
  ecosystems?: string[];
  categories?: string[];
}

interface GlobalSearchContextInterface {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  inputValue: string | null;
  onInputChange: (value: string) => void;
  suggestion?: string;
  isOpenFilter: boolean;
  onOpenFilterChange: (value: boolean) => void;
  onClearAllFilters: () => void;
  filters: Filters;
  onFiltersChange: (value: Filters) => void;
  onFiltersTypeChange: (value?: SearchRessourceType) => void;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  results: SearchItemInterface[];
  projectFacets: SearchModel["projectFacets"];
  typeFacets: SearchModel["typeFacets"];
}

// Initialize context with default values
export const GlobalSearchContext = createContext<GlobalSearchContextInterface>({
  isOpen: false,
  onOpenChange: () => {},
  inputValue: "",
  onInputChange: () => {},
  suggestion: "",
  isOpenFilter: false,
  onOpenFilterChange: () => {},
  onClearAllFilters: () => {},
  filters: {},
  onFiltersChange: () => {},
  onFiltersTypeChange: () => {},
  hasNextPage: false,
  fetchNextPage: () => {},
  isFetchingNextPage: false,
  results: [],
  projectFacets: {
    ecosystems: [],
    categories: [],
    languages: [],
  },
  typeFacets: {
    types: [],
  },
});

export function GlobalSearchProvider({ children }: PropsWithChildren) {
  // State management
  const [open, setOpen] = useState(false);
  const [debouncedOpen, setDebouncedOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});

  // Debounce the search modal open state
  useDebounce(
    () => {
      setDebouncedOpen(open);
    },
    300,
    [open]
  );

  const queryParams = useMemo(
    () =>
      new SearchDto({
        keyword: inputValue ?? "",
        languages: filters.languages,
        ecosystems: filters.ecosystems,
        categories: filters.categories,
        type: filters.type,
      }).toBody(),
    [inputValue, filters]
  );

  // Fetch search results and suggestions
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = SearchReactQueryAdapter.client.useSearch({
    queryParams: queryParams,
    options: {
      enabled: debouncedOpen,
    },
  });

  const { data: Suggestion } = SearchReactQueryAdapter.client.useSuggest({
    queryParams: queryParams,
    options: {
      enabled: debouncedOpen,
    },
  });

  // Helper functions for facet handling
  const mergeFacetsWithFilters = (facets: SearchFacet[], filters: string[] = []): SearchFacet[] => {
    const result = [...facets];
    filters.forEach(filter => {
      if (!result.find(f => f.name === filter)) {
        result.push({ name: filter, count: 0 });
      }
    });

    return result;
  };

  const extractFacetsFromPages = (accessor: (page: SearchModel) => SearchFacet[] | undefined): SearchFacet[] => {
    return data?.pages.flatMap(page => accessor(page) ?? []) ?? [];
  };

  // Memoized facets
  const projectFacets: SearchModel["projectFacets"] = useMemo(() => {
    const ecosystems = extractFacetsFromPages(page => page.projectFacets?.ecosystems);
    const categories = extractFacetsFromPages(page => page.projectFacets?.categories);
    const languages = extractFacetsFromPages(page => page.projectFacets?.languages);

    return {
      ecosystems: mergeFacetsWithFilters(ecosystems, filters.ecosystems),
      categories: mergeFacetsWithFilters(categories, filters.categories),
      languages: mergeFacetsWithFilters(languages, filters.languages),
    };
  }, [data]);

  const typeFacets: SearchModel["typeFacets"] = useMemo(() => {
    const types = extractFacetsFromPages(page => page.typeFacets?.types);

    return {
      types: mergeFacetsWithFilters(types, filters.type ? [SearchDto.ressourceTypeToString(filters.type)] : []),
    };
  }, [data]);

  // Event handlers
  function onOpenChange(v: boolean) {
    if (!v) {
      setFilters({});
      setInputValue(null);
      setOpen(false);
      setOpenFilter(false);
    } else {
      setOpen(true);
      setDebouncedOpen(true);
    }
  }

  function onInputChange(v: string) {
    if (!v) {
      setFilters({});
      setOpenFilter(false);
    }
    setInputValue(v);
  }

  function onOpenFilterChange(v: boolean) {
    setOpenFilter(v);
  }

  function onClearAllFilters() {
    setFilters({});
    setOpenFilter(false);
  }

  function onFiltersChange(value: Filters) {
    setFilters(value);
  }

  function onFiltersTypeChange(value?: SearchRessourceType) {
    if (value) {
      setFilters({ type: value });
    } else {
      setFilters({});
    }
  }

  // Keyboard event handlers
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
      if (e.key === "Tab" && Suggestion?.value) {
        e.preventDefault();
        setInputValue(Suggestion.value);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [Suggestion, open]);

  // Render provider
  return (
    <GlobalSearchContext.Provider
      value={{
        isOpen: open,
        onOpenChange,
        inputValue,
        onInputChange,
        suggestion: Suggestion?.value,
        isOpenFilter: openFilter,
        onOpenFilterChange,
        onClearAllFilters,
        filters,
        onFiltersChange,
        onFiltersTypeChange,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        results: data?.pages.flatMap(page => page.results) ?? [],
        projectFacets,
        typeFacets,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

// Hook for consuming the context
export function useGlobalSearch() {
  return useContext(GlobalSearchContext);
}
