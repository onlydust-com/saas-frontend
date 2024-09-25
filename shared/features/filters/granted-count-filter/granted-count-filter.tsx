import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { GrantedCountFilterProps } from "@/shared/features/filters/granted-count-filter/granted-count-filter.types";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

export function GrantedCountFilter({ value, onChange, unit }: GrantedCountFilterProps) {
  return (
    <AccordionFilter
      name={"granted-count"}
      title={{ translate: { token: "features:filters.grantedCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"granted-count"} value={value} onChange={onChange} unit={unit} />
    </AccordionFilter>
  );
}
