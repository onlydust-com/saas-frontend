import { ProjectTagUnion } from "@/shared/constants/project-tags";

export interface ProjectTagsFilterProps {
  tags: ProjectTagUnion[];
  onSelect: (tags: ProjectTagUnion[]) => void;
}
