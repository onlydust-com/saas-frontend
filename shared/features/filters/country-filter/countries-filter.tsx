import { useTranslation } from "react-i18next";

import { CountryAutocomplete } from "@/shared/features/autocompletes/country-autocomplete/country-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { CountryFilterProps } from "@/shared/features/filters/country-filter/country-filter.types";

export function CountryFilter({ onSelect, selectedCountries }: CountryFilterProps) {
  const { t } = useTranslation("features");

  return (
    <AccordionFilter
      name={"countries"}
      title={{ translate: { token: "features:filters.country.title" } }}
      selected={selectedCountries?.length}
    >
      <CountryAutocomplete
        name={"countries"}
        selectedCountries={selectedCountries}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.country.placeholder")}
      />
    </AccordionFilter>
  );
}
