import { IssueAvailabilityType } from "@/shared/features/autocompletes/issue-available-autocomplete/issue-available-autocomplete.types";

export { IssueAvailabilityType };

export interface IssueAvailableFilterProps {
  selectedAvailability?: string[];
  onSelect?: (availability: string[]) => void;
}
