import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { BudgetUsedCountFilterProps } from "@/shared/features/filters/budget-used-count-filter/budget-used-count-filter.types";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

export function BudgetUsedCountFilter({ value, onChange, unit }: BudgetUsedCountFilterProps) {
  return (
    <AccordionFilter
      name={"budget-used-count"}
      title={{ translate: { token: "features:filters.budgetUsedCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"budget-used-count"} value={value} onChange={onChange} unit={unit} />
    </AccordionFilter>
  );
}
