import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";

import { LeadProjectProps } from "./lead-project.types";

export function LeadProject({ selectedUser, onSelect }: LeadProjectProps) {
  const fieldName = "coucou";
  return (
    <AccordionFilter name={fieldName} title={{ children: "LEAD" }} selected={selectedUser?.length}>
      <UserAutocomplete
        name={fieldName}
        selectedUser={selectedUser}
        isPopover={false}
        onSelect={onSelect}
        isMultiple={true}
      />
    </AccordionFilter>
  );
}
