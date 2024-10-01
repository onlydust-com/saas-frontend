import {
  GetMyOrganizationsPortParams,
  GetMyOrganizationsPortResponse,
} from "@/core/domain/github/github-contract.types";

export interface GithubFacadePort {
  getMyOrganizations(p: GetMyOrganizationsPortParams): GetMyOrganizationsPortResponse;
}
