import { DateRangeType, TimeGroupingType } from "@/core/kernel/date/date-facade-port";

export interface TimeGroupingMenuProps {
  selectedTimeGrouping: TimeGroupingType;
  onAction: (timeGrouping: string) => void;
  relatedDateRangeType: DateRangeType;
}
