import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface ProgramEcosystemAutocompleteProps extends SelectExtendedProps {
  selectedProgramsEcosystems?: string[];
  onSelect?: (programsEcosystems: string[]) => void;
}
