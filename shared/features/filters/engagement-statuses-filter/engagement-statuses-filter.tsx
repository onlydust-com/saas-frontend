import { useMemo } from "react";

import { EngagementStatusesAutocomplete } from "@/shared/features/autocompletes/engagement-statuses-autocomplete/engagement-statuses-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { EngagementStatusesFilterProps } from "@/shared/features/filters/engagement-statuses-filter/engagement-statuses-filter.types";

export function EngagementStatusesFilter({ selectedEngagementStatus, onSelect }: EngagementStatusesFilterProps) {
  const selectedEngagement = useMemo(() => {
    if (Array.isArray(selectedEngagementStatus)) {
      return selectedEngagementStatus;
    }
    return selectedEngagementStatus ? [selectedEngagementStatus] : [];
  }, [selectedEngagementStatus]);

  return (
    <AccordionFilter
      name="activity-statuses"
      title={{ translate: { token: "features:filters.engagementStatuses.title" } }}
      selected={selectedEngagement?.length}
    >
      <EngagementStatusesAutocomplete
        name="activity-statuses"
        selectedEngagementStatus={selectedEngagement}
        isPopover={false}
        onSelect={onSelect}
      />
    </AccordionFilter>
  );
}
