import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";
import { RewardCountFilterProps } from "@/shared/features/filters/reward-count-filter/reward-count-filter.types";

export function RewardCountFilter({ value, onChange }: RewardCountFilterProps) {
  return (
    <AccordionFilter
      name={"reward-count"}
      title={{ translate: { token: "features:filters.rewardCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"reward-count"} value={value} onChange={onChange} />
    </AccordionFilter>
  );
}
