import { ContributorEngagementStatusesUnion } from "@/core/domain/bi/models/bi.types";

import { SelectInputProps } from "@/design-system/molecules/select";

export interface EngagementStatusesAutocompleteProps extends SelectInputProps {
  selectedEngagementStatus?: ContributorEngagementStatusesUnion[];
  onSelect?: (engagementStatuses: ContributorEngagementStatusesUnion[]) => void;
}
