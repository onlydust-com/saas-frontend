import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { TypeFilterProps } from "@/shared/features/filters/type-filter/type-filter.types";

export function TypeFilter({ selectedType, onSelect }: TypeFilterProps) {
  const fieldName = "type";
  return (
    <AccordionFilter name={fieldName} title={{ children: "TYPE" }} selected={selectedType?.length}>
      coucou
    </AccordionFilter>
  );
}
