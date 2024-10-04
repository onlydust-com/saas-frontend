import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Contributions ------------------------------ */

export type GetContributionsResponse = components["schemas"]["ContributionActivityPageResponse"];
export type GetContributionsModel = Omit<GetContributionsResponse, "contributions"> & {
  contributions: ContributionActivityInterface[];
};

type GetContributionsQueryParams = operations["getContributions"]["parameters"]["query"];

export type GetContributionsPortResponse = HttpStorageResponse<GetContributionsModel>;

export type GetContributionsPortParams = HttpClientParameters<{ QueryParams: GetContributionsQueryParams }>;
