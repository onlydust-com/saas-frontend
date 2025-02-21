import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetQuestContributorResponse = components["schemas"]["QuestApplicationMatchingResponse"];

export type GetQuestContributorPortResponse = HttpStorageResponse<GetQuestContributorResponse>;

type GetQuestContributorMatchingQueryParams = operations["getContributorMatching"]["parameters"]["query"];
type GetQuestContributorMatchingPathParams = operations["getContributorMatching"]["parameters"]["path"];

export type GetContributorMatchingPortParams = HttpClientParameters<{
  QueryParams: GetQuestContributorMatchingQueryParams;
  PathParams: GetQuestContributorMatchingPathParams;
}>;
