import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { OnboardedDevCountFilterProps } from "@/shared/features/filters/onboarded-dev-count-filter/onboarded-dev-count-filter.types";
import { QuantityFilter } from "@/shared/features/filters/quantity-filter/quantity-filter";

export function OnboardedDevCountFilter({ value, onChange, unit }: OnboardedDevCountFilterProps) {
  return (
    <AccordionFilter
      name={"onboarded-dev-count"}
      title={{ translate: { token: "features:filters.onboardedDevCount.title" } }}
      selected={value?.amount ? 1 : 0}
    >
      <QuantityFilter name={"onboarded-dev-count"} value={value} onChange={onChange} unit={unit} />
    </AccordionFilter>
  );
}
