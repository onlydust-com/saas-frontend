import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface UserUuidAutocompleteProps extends SelectExtendedProps {
  selectedUser?: string[];
  onSelect?: (user: string[]) => void;
  initialUsers?: MenuItemPort[];
}
