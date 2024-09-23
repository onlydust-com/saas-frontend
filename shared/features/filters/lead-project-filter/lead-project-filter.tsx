import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";

import { LeadProjectFilterProps } from "./lead-project-filter.types";

export function LeadProjectFilter({ selectedUser, onSelect }: LeadProjectFilterProps) {
  return (
    <AccordionFilter
      name={"lead-project"}
      title={{ translate: { token: "features:filters.leadProject.title" } }}
      selected={selectedUser?.length}
    >
      <UserAutocomplete
        name={"lead-project"}
        selectedUser={selectedUser}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
      />
    </AccordionFilter>
  );
}
