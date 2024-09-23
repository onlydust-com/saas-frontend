import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { UserTypeFilterProps } from "@/shared/features/filters/user-type-filter/user-type-filter.types";

export function UserTypeFilter({ selectedUserType, onSelect }: UserTypeFilterProps) {
  const fieldName = "user-type";
  return (
    <AccordionFilter name={fieldName} title={{ children: "TYPE" }} selected={selectedUserType?.length}>
      coucou
    </AccordionFilter>
  );
}
