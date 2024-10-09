import { useTranslation } from "react-i18next";

import { EcosystemsAutocomplete } from "@/shared/features/autocompletes/ecosystems-autocomplete/ecosystems-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { EcosystemFilterProps } from "@/shared/features/filters/ecosystem-filter/ecosystem-filter.types";

export function EcosystemFilter({ selectedEcosystems, onSelect }: EcosystemFilterProps) {
  const { t } = useTranslation("features");

  return (
    <AccordionFilter
      name={"ecosystem"}
      title={{ translate: { token: "features:filters.ecosystem.title" } }}
      selected={selectedEcosystems?.length}
    >
      <EcosystemsAutocomplete
        name={"ecosystem"}
        selectedEcosystems={selectedEcosystems}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.ecosystem.placeholder")}
      />
    </AccordionFilter>
  );
}
