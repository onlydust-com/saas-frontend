import { useMemo } from "react";

import { ProjectCategoryReactQueryAdapter } from "@/core/application/react-query-adapter/project-category";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";

import { Combobox, ComboboxProps } from "@/shared/ui/combobox";

import { CategoriesFilterProps } from "./categories-filter.types";

export function CategoriesFilter({ categoriesIds, onSelect }: CategoriesFilterProps) {
  const { data: data } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});

  const options: ComboboxProps<string>["options"] = useMemo(() => {
    return (
      data?.categories?.map(category => ({
        value: category.id,
        label: category.name,
        keywords: [category.name],
        startContent: <RemixIcon name={category.iconSlug as RemixIconsName} />,
      })) ?? []
    );
  }, [data]);

  return (
    <Combobox
      options={options}
      value={categoriesIds}
      onChange={onSelect}
      selectedLabel="categories"
      placeholder="Select categories"
    />
  );
}
