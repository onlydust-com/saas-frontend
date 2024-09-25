import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { DevActiveCountFilterProps } from "@/shared/features/filters/dev-active-count-filter/dev-active-count-filter.types";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

export function DevActiveCountFilter({ value, onChange }: DevActiveCountFilterProps) {
  return (
    <AccordionFilter
      name={"dev-active-count"}
      title={{ translate: { token: "features:filters.devActiveCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"dev-active-count"} value={value} onChange={onChange} />
    </AccordionFilter>
  );
}
