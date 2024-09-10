import { SelectInputProps } from "@/design-system/molecules/select";

export interface UserAutocompleteProps extends SelectInputProps {
  withExternalUser?: boolean;
  withInternalUserOnly?: boolean;
  withExternalUserOnly?: boolean;
  selectedUser?: string[];
  onSelect?: (user: string[]) => void;
}
