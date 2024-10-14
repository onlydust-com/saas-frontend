import { ContributionTypeUnion } from "@/core/domain/contribution/models/contribution.types";

export interface ContributionTypeFilterProps {
  selectedContributionType?: ContributionTypeUnion[];
  onSelect?: (contributionTypes: ContributionTypeUnion[]) => void;
}
