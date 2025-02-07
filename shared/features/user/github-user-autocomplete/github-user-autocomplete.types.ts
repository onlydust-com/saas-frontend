import { MenuItemAvatarPort } from "@/design-system/molecules/menu-item";
import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface GithubUserAutocompleteProps extends SelectExtendedProps<string> {
  withExternalUser?: boolean;
  withInternalUserOnly?: boolean;
  withExternalUserOnly?: boolean;
  withIsRegistered?: boolean;
  selectedUser?: string[];
  onSelect?: (user: string[], items: MenuItemAvatarPort<string>[]) => void;
}
