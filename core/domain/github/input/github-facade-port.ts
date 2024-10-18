import {
  GetMyOrganizationsPortParams,
  GetMyOrganizationsPortResponse,
  UpdatePullRequestPortParams,
  UpdatePullRequestPortResponse,
} from "@/core/domain/github/github-contract.types";

export interface GithubFacadePort {
  getMyOrganizations(p: GetMyOrganizationsPortParams): GetMyOrganizationsPortResponse;
  updatePullRequest(p: UpdatePullRequestPortParams): UpdatePullRequestPortResponse;
}
