import { RewardedAutocomplete } from "@/shared/features/autocompletes/rewarded-autocomplete/rewarded-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { RewardedFilterProps } from "@/shared/features/filters/rewarded-filter/rewarded-filter.types";

export function RewardedFilter({ selectedRewardedType, onSelect }: RewardedFilterProps) {
  return (
    <AccordionFilter
      name="rewarded"
      title={{ translate: { token: "features:filters.rewarded.title" } }}
      selected={selectedRewardedType?.length}
    >
      <RewardedAutocomplete
        name="rewarded"
        selectedRewardedType={selectedRewardedType}
        isPopover={false}
        onSelect={onSelect}
      />
    </AccordionFilter>
  );
}
