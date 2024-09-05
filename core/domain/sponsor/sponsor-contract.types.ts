import { SponsorTransactionsStatsInterface } from "@/core/domain/sponsor/models/sponsor-transactions-stats-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetSponsorResponse = components["schemas"]["SponsorResponse"];

export type GetSponsorPortResponse = HttpStorageResponse<GetSponsorResponse>;

type GetSponsorPathParams = operations["getSponsor"]["parameters"]["path"];
export type GetSponsorPortParams = HttpClientParameters<{
  PathParams: GetSponsorPathParams;
}>;

/* --------------------- Get Sponsor Transactions Stats --------------------- */
export type GetSponsorTransactionsStatsResponse = components["schemas"]["SponsorTransactionStatListResponse"];
export type GetSponsorTransactionsStatsModel = Omit<GetSponsorTransactionsStatsResponse, "stats"> & {
  stats: SponsorTransactionsStatsInterface[];
};

type GetSponsorTransactionsStatsQueryParams = operations["getSponsorTransactionsStats"]["parameters"]["query"];

type GetSponsorTransactionsStatsPathParams = operations["getSponsorTransactionsStats"]["parameters"]["path"];

export type GetSponsorTransactionsStatsPortParams = HttpClientParameters<{
  QueryParams: GetSponsorTransactionsStatsQueryParams;
  PathParams: GetSponsorTransactionsStatsPathParams;
}>;

export type GetSponsorTransactionsStatsPortResponse = HttpStorageResponse<GetSponsorTransactionsStatsModel>;
