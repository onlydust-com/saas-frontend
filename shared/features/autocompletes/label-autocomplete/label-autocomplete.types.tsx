import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface LabelAutocompleteProps extends SelectExtendedProps {
  selectedLabels?: string[];
  onSelect?: (labels: string[]) => void;
}
