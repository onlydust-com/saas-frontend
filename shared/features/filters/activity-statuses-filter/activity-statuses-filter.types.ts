import { ContributorActivityStatusesUnion } from "@/core/domain/bi/models/bi.types";

export interface ActivityStatusesFilterProps {
  selectedActivityStatus?: ContributorActivityStatusesUnion[];
  onSelect?: (activityStatuses?: ContributorActivityStatusesUnion[]) => void;
}
