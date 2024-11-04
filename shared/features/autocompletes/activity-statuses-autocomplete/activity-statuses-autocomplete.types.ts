import { ContributorActivityStatusesUnion } from "@/core/domain/bi/models/bi.types";

import { SelectInputProps } from "@/design-system/molecules/select";

export interface ActivityStatusesAutocompleteProps extends SelectInputProps {
  selectedActivityStatus?: ContributorActivityStatusesUnion;
  onSelect?: (activityStatuses: ContributorActivityStatusesUnion) => void;
}
