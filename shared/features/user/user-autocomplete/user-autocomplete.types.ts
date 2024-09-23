import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface UserAutocompleteProps extends SelectExtendedProps {
  withExternalUser?: boolean;
  withInternalUserOnly?: boolean;
  withExternalUserOnly?: boolean;
  selectedUser?: string[];
  onSelect?: (user: string[]) => void;
}
