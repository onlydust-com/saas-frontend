import { ProjectAutocompleteProps } from "@/shared/features/autocompletes/project-autocomplete/project-autocomplete.types";

export interface ProjectFilterProps extends Pick<ProjectAutocompleteProps, "mine"> {
  selectedProjects?: string[];
  onSelect?: (projects: string[]) => void;
}
