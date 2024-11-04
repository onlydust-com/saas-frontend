import { SelectInputProps } from "@/design-system/molecules/select";

export interface ActivityStatusesAutocompleteProps extends SelectInputProps {
  selectedActivityStatus?: string[];
  onSelect?: (activityStatuses: string[]) => void;
}
