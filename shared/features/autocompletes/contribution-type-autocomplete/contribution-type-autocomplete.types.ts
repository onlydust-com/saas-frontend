import { SelectInputProps } from "@/design-system/molecules/select";

export interface ContributionTypeAutocompleteProps extends SelectInputProps {
  selectedContributionType?: string[];
  onSelect?: (contributionType: string[]) => void;
}
