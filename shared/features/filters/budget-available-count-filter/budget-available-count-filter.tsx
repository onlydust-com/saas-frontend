import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { BudgetAvailableCountFilterProps } from "@/shared/features/filters/budget-available-count-filter/budget-available-count-filter.types";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

export function BudgetAvailableCountFilter({ value, onChange, unit }: BudgetAvailableCountFilterProps) {
  return (
    <AccordionFilter
      name={"budget-available-count"}
      title={{ translate: { token: "features:filters.budgetAvailableCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"budget-available-count"} value={value} onChange={onChange} unit={unit} />
    </AccordionFilter>
  );
}
