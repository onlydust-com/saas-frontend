import { SelectInputProps } from "@/design-system/molecules/select";

export interface UserAutocompleteProps extends SelectInputProps {
  withExternalUser?: boolean;
  selectedUser?: number[];
  onSelect?: (user: number[]) => void;
}
