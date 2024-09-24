import { useMemo } from "react";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { MenuItemId, MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { CategoryAutocompleteProps } from "@/shared/features/autocompletes/category-autocomplete/category-autocomplete.types";

export function CategoryAutocomplete({ selectedCategories, onSelect, ...selectProps }: CategoryAutocompleteProps) {
  const { data: data } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  const categoriesItem: MenuItemPort[] = useMemo(() => {
    return (
      data?.categories?.map(category => ({
        id: category.id,
        label: category.name,
        searchValue: category.name,
        icon: { name: category.iconSlug },
      })) ?? []
    );
  }, [data]);

  function handleSelect(ids: MenuItemId[]) {
    onSelect?.(ids as string[]);
  }

  return (
    <Select
      items={categoriesItem}
      isAutoComplete={true}
      onSelect={handleSelect}
      selectedIds={selectedCategories}
      {...selectProps}
    />
  );
}
