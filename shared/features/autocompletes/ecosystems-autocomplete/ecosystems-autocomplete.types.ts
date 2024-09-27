import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface EcosystemsAutocompleteProps extends SelectExtendedProps {
  selectedEcosystems?: string[];
  onSelect?: (ecosystems: string[]) => void;
  initialEcosystems?: MenuItemPort[];
}
