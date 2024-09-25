import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

import { PrMergedCountFilterProps } from "./pr-merged-count-filter.types";

export function PrMergedCountFilter({ value, onChange }: PrMergedCountFilterProps) {
  return (
    <AccordionFilter
      name={"pr-merged-count"}
      title={{ translate: { token: "features:filters.prMergedCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"pr-merged-count"} value={value} onChange={onChange} />
    </AccordionFilter>
  );
}
