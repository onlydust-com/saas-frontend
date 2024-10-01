import {
  GetMyOrganizationsPortParams,
  GetMyOrganizationsPortResponse,
} from "@/core/domain/github/github-contract.types";

export interface GithubStoragePort {
  routes: Record<string, string>;
  getMyOrganizations(p: GetMyOrganizationsPortParams): GetMyOrganizationsPortResponse;
}
