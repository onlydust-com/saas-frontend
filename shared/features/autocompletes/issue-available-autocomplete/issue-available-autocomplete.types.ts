import { SelectInputProps } from "@/design-system/molecules/select";

export enum IssueAvailabilityType {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface IssueAvailableAutocompleteProps extends SelectInputProps {
  selectedAvailability?: string[];
  onSelect?: (ids: string[]) => void;
}
