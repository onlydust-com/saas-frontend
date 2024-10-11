import { ContributionTypeAutocomplete } from "@/shared/features/autocompletes/contribution-type-autocomplete/contribution-type-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { ContributionTypeFilterProps } from "@/shared/features/filters/contribution-type-filter/contribution-type-filter.types";

export function ContributionTypeFilter({ selectedContributionType, onSelect }: ContributionTypeFilterProps) {
  return (
    <AccordionFilter
      name="contribution-type"
      title={{ translate: { token: "features:filters.contributionType.title" } }}
      selected={selectedContributionType?.length}
    >
      <ContributionTypeAutocomplete
        name="contribution-type"
        selectedContributionType={selectedContributionType}
        isPopover={false}
        onSelect={onSelect}
      />
    </AccordionFilter>
  );
}
