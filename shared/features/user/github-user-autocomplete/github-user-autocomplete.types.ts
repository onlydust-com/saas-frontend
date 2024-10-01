import { MenuItemAvatarPort } from "@/design-system/molecules/menu-item";
import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface GithubUserAutocompleteProps extends SelectExtendedProps {
  withExternalUser?: boolean;
  withInternalUserOnly?: boolean;
  withExternalUserOnly?: boolean;
  selectedUser?: number[];
  onSelect?: (user: number[], items: MenuItemAvatarPort<number>[]) => void;
}
