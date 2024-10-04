import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface ProjectRepoAutocompleteProps extends SelectExtendedProps {
  selectedRepos?: string[];
  onSelect?: (repos: string[]) => void;
  projectSlug: string;
}
