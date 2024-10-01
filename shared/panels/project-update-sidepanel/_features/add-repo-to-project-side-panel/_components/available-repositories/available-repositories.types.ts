import { GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";
import { ProjectInterface } from "@/core/domain/project/models/project-model";

export interface AvailableRepositoriesProps {
  organizations: GithubOrganizationInterface[];
  project: ProjectInterface;
  onSearch: (search: string | null) => void;
  search?: string | null;
}
