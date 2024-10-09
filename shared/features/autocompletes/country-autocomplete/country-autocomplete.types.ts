import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface CountryAutocompleteProps extends SelectExtendedProps {
  selectedCountries?: string[];
  onSelect?: (countries: string[]) => void;
}
