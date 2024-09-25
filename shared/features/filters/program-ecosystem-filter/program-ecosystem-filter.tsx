import { useTranslation } from "react-i18next";

import { ProgramEcosystemAutocomplete } from "@/shared/features/autocompletes/program-ecosystem-autocomplete/program-ecosystem-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { ProgramEcosystemFilterProps } from "@/shared/features/filters/program-ecosystem-filter/program-ecosystem-filter.types";

export function ProgramEcosystemFilter({ selectedProgramsEcosystems, onSelect }: ProgramEcosystemFilterProps) {
  const { t } = useTranslation("features");

  return (
    <AccordionFilter
      name={"program-ecosystem"}
      title={{ translate: { token: "features:filters.programEcosystem.title" } }}
      selected={selectedProgramsEcosystems?.length}
    >
      <ProgramEcosystemAutocomplete
        name={"program-ecosystem"}
        selectedProgramsEcosystems={selectedProgramsEcosystems}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("filters.programEcosystem.placeholder")}
      />
    </AccordionFilter>
  );
}
