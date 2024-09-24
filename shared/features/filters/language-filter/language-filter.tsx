import { useTranslation } from "react-i18next";

import { LanguageAutocomplete } from "@/shared/features/autocompletes/language-autocomplete/language-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";

import { LanguageFilterProps } from "./language-filter.types";

export function LanguageFilter({ onSelect, selectedLanguages }: LanguageFilterProps) {
  const { t } = useTranslation("features");

  return (
    <AccordionFilter
      name={"language"}
      title={{ translate: { token: "features:filters.language.title" } }}
      selected={selectedLanguages?.length}
    >
      <LanguageAutocomplete
        name={"language"}
        selectedLanguages={selectedLanguages}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.language.placeholder")}
      />
    </AccordionFilter>
  );
}
