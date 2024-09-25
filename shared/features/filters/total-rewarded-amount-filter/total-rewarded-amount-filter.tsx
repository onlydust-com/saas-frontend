import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

import { TotalRewardedAmountFilterProps } from "./total-rewarded-amount-filter.types";

export function TotalRewardedAmountFilter({ onChange, value }: TotalRewardedAmountFilterProps) {
  return (
    <AccordionFilter
      name={"total-rewarded-amount"}
      title={{ translate: { token: "features:filters.totalRewardedAmount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"total-rewarded-amount"} value={value} onChange={onChange} />
    </AccordionFilter>
  );
}
