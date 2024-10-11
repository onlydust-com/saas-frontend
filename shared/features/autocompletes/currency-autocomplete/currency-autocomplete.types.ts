import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface CurrencyAutocompleteProps extends SelectExtendedProps {
  selectedCurrencies?: string[];
  onSelect?: (currencies: string[]) => void;
}
