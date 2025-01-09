import { IssueAvailableAutocomplete } from "@/shared/features/autocompletes/issue-available-autocomplete/issue-available-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { IssueAvailableFilterProps } from "@/shared/features/filters/issue-available-filter/issue-available-filter.types";

export function IssueAvailableFilter({ selectedAvailability, onSelect }: IssueAvailableFilterProps) {
  return (
    <AccordionFilter
      name="issue-available"
      title={{ translate: { token: "features:filters.issueAvailable.title" } }}
      selected={selectedAvailability?.length}
    >
      <IssueAvailableAutocomplete
        name="issue-available"
        selectedAvailability={selectedAvailability}
        isPopover={false}
        onSelect={onSelect}
      />
    </AccordionFilter>
  );
}
