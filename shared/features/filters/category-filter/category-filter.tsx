import { useTranslation } from "react-i18next";

import { CategoryAutocomplete } from "@/shared/features/autocompletes/category-autocomplete/category-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { CategoryFilterProps } from "@/shared/features/filters/category-filter/category-filter.types";

export function CategoryFilter({ onSelect, selectedCategories }: CategoryFilterProps) {
  const { t } = useTranslation("features");

  return (
    <AccordionFilter
      name={"category"}
      title={{ translate: { token: "features:filters.category.title" } }}
      selected={selectedCategories?.length}
    >
      <CategoryAutocomplete
        name={"category"}
        selectedCategories={selectedCategories}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.category.placeholder")}
      />
    </AccordionFilter>
  );
}
