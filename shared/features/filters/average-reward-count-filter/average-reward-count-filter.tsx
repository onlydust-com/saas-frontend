import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { AverageRewardCountFilterProps } from "@/shared/features/filters/average-reward-count-filter/average-reward-count-filter.types";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

export function AverageRewardCountFilter({ value, onChange, unit }: AverageRewardCountFilterProps) {
  return (
    <AccordionFilter
      name={"average-reward-count"}
      title={{ translate: { token: "features:filters.averageRewardCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"average-reward-count"} value={value} onChange={onChange} unit={unit} />
    </AccordionFilter>
  );
}
