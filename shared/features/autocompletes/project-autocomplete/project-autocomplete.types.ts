import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface ProjectAutocompleteProps extends SelectExtendedProps {
  selectedProjects?: string[];
  onSelect?: (project: string[]) => void;
  mine?: boolean;
}
