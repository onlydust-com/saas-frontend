import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface LanguageAutocompleteProps extends SelectExtendedProps {
  selectedLanguages?: string[];
  onSelect?: (languages: string[]) => void;
}
