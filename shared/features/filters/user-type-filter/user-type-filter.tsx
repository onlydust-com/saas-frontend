import { UserTypeAutocomplete } from "@/shared/features/autocompletes/user-type-autocomplete/user-type-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { UserTypeFilterProps } from "@/shared/features/filters/user-type-filter/user-type-filter.types";

export function UserTypeFilter({ selectedUserType, onSelect }: UserTypeFilterProps) {
  return (
    <AccordionFilter
      name="user-type"
      title={{ translate: { token: "features:filters.userType.title" } }}
      selected={selectedUserType?.length}
    >
      <UserTypeAutocomplete
        name="user-type"
        selectedUserType={selectedUserType}
        isPopover={false}
        onSelect={onSelect}
      />
    </AccordionFilter>
  );
}
