import { SelectExtendedProps } from "@/design-system/molecules/select";

export interface ProjectRepoAutocompleteProps extends SelectExtendedProps<number> {
  selectedRepos?: number[];
  onSelect?: (repos: number[]) => void;
  projectSlug: string;
}
