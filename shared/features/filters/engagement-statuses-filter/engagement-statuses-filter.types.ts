import { ContributorEngagementStatusesUnion } from "@/core/domain/bi/models/bi.types";

export interface EngagementStatusesFilterProps {
  selectedEngagementStatus?: ContributorEngagementStatusesUnion[];
  onSelect?: (engagementStatuses?: ContributorEngagementStatusesUnion[]) => void;
}
