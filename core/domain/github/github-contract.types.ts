import { GithubOrganizationList } from "@/core/domain/github/models/github-organization-list-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetMyOrganizationsResponse = components["schemas"]["GithubOrganizationResponse"][];

export type GetMyOrganizationsModel = GithubOrganizationList;

export type GetMyOrganizationsPortResponse = HttpStorageResponse<GetMyOrganizationsModel>;

type GetMyOrganizationsQueryParams = operations["searchGithubUserOrganizations"]["parameters"]["query"];
type GetMyOrganizationsPathParams = operations["searchGithubUserOrganizations"]["parameters"]["path"];

export type GetMyOrganizationsPortParams = HttpClientParameters<{
  QueryParams: GetMyOrganizationsQueryParams;
  PathParams: GetMyOrganizationsPathParams;
}>;

/* ------------------------------ Update Pull Request ------------------------------ */

export type UpdatePullRequestBody = components["schemas"]["PullRequestPatchRequest"];

type UpdatePullRequestPathParams = operations["updatePullRequest"]["parameters"]["path"];

export type UpdatePullRequestPortParams = HttpClientParameters<{ PathParams: UpdatePullRequestPathParams }>;

export type UpdatePullRequestPortResponse = HttpStorageResponse;
