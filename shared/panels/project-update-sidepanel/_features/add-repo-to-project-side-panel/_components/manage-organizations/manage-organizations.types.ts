import { GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";

export interface ManageOrganizationsProps {
  installed: GithubOrganizationInterface[];
  notInstalled: GithubOrganizationInterface[];
  onRefresh: () => void;
}
