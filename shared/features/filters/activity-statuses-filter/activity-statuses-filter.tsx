import { useMemo } from "react";

import { ActivityStatusesAutocomplete } from "@/shared/features/autocompletes/activity-statuses-autocomplete/activity-statuses-autocomplete";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { ActivityStatusesFilterProps } from "@/shared/features/filters/activity-statuses-filter/activity-statuses-filter.types";

export function ActivityStatusesFilter({ selectedActivityStatus, onSelect }: ActivityStatusesFilterProps) {
  const selectedActivity = useMemo(() => {
    if (Array.isArray(selectedActivityStatus)) {
      return selectedActivityStatus;
    }
    return selectedActivityStatus ? [selectedActivityStatus] : [];
  }, [selectedActivityStatus]);

  return (
    <AccordionFilter
      name="activity-statuses"
      title={{ translate: { token: "features:filters.activityStatuses.title" } }}
      selected={selectedActivity?.length}
    >
      <ActivityStatusesAutocomplete
        name="activity-statuses"
        selectedActivityStatus={selectedActivity}
        isPopover={false}
        onSelect={onSelect}
      />
    </AccordionFilter>
  );
}
