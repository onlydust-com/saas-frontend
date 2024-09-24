import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface CategoryAutocompleteProps extends SelectExtendedProps {
  selectedCategories?: string[];
  onSelect?: (categories: string[]) => void;
}
