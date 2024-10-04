import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { ContributorLabelAutocomplete } from "@/shared/features/autocompletes/contributor-label-autocomplete/contributor-label-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { ContributorLabelFilterProps } from "@/shared/features/filters/contributor-label-filter/contributor-label-filter.types";

export function ContributorLabelFilter({ selectedLabel, onSelect }: ContributorLabelFilterProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { t } = useTranslation();
  return (
    <AccordionFilter
      name={"contributor-label"}
      title={{ translate: { token: "features:filters.contributorLabel.title" } }}
      selected={selectedLabel?.length}
    >
      <ContributorLabelAutocomplete
        name={"contributor-label"}
        selectedLabels={selectedLabel}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
        placeholder={t("features:filters.contributorLabel.placeholder")}
        projectIdOrSlug={projectSlug}
      />
    </AccordionFilter>
  );
}
