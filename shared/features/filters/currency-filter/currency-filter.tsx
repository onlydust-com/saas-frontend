import { useTranslation } from "react-i18next";

import { CurrencyAutocomplete } from "@/shared/features/autocompletes/currency-autocomplete/currency-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { CurrencyFilterProps } from "@/shared/features/filters/currency-filter/currency-filter.types";

export function CurrencyFilter({ onSelect, selectedCurrencies }: CurrencyFilterProps) {
  const { t } = useTranslation("features");

  return (
    <AccordionFilter
      name={"currency"}
      title={{ translate: { token: "features:filters.currency.title" } }}
      selected={selectedCurrencies?.length}
    >
      <CurrencyAutocomplete
        name={"currency"}
        selectedCurrencies={selectedCurrencies}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.currency.placeholder")}
      />
    </AccordionFilter>
  );
}
