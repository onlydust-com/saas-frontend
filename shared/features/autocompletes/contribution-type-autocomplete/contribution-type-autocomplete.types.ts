import { ContributionTypeUnion } from "@/core/domain/contribution/models/contribution.types";

import { SelectInputProps } from "@/design-system/molecules/select";

export interface ContributionTypeAutocompleteProps extends SelectInputProps {
  selectedContributionType?: ContributionTypeUnion[];
  onSelect?: (contributionTypes?: ContributionTypeUnion[]) => void;
  excludeContributionTypes?: ContributionTypeUnion[];
}
