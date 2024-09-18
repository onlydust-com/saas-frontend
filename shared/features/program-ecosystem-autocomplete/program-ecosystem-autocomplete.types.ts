import { SelectInputProps } from "@/design-system/molecules/select";

export interface ProgramEcosystemAutocompleteProps extends SelectInputProps {
  selectedProgramAndEcosystem?: string[];
  onSelect?: (user: string[]) => void;
}
