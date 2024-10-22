import {
  GetMyOrganizationsPortParams,
  GetMyOrganizationsPortResponse,
  UpdatePullRequestPortParams,
  UpdatePullRequestPortResponse,
} from "@/core/domain/github/github-contract.types";

export interface GithubStoragePort {
  routes: Record<string, string>;
  getMyOrganizations(p: GetMyOrganizationsPortParams): GetMyOrganizationsPortResponse;
  updatePullRequest(p: UpdatePullRequestPortParams): UpdatePullRequestPortResponse;
}
