import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface ContributorLabelAutocompleteProps extends SelectExtendedProps {
  selectedLabels?: string[];
  onSelect?: (labels: string[]) => void;
  projectIdOrSlug: string;
}
