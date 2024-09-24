import { SelectInputProps } from "@/design-system/molecules/select";

export interface UserTypeAutocompleteProps extends SelectInputProps {
  selectedUserType?: string[];
  onSelect?: (userType: string[]) => void;
}
