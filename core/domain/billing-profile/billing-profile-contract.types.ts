import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Billing Profile by ID ------------------------------ */

export type GetBillingProfileByIdResponse = components["schemas"]["BillingProfileResponse"];

export type GetBillingProfileByIdPortResponse = HttpStorageResponse<GetBillingProfileByIdResponse>;

type GetBillingProfileByIdPathParams = operations["getProgram"]["parameters"]["path"];

export type GetBillingProfileByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfileByIdPathParams;
}>;

/* ------------------------------ Get Billing Profile Payout Info by ID ------------------------------ */

export type GetBillingProfilePayoutInfoByIdResponse = components["schemas"]["BillingProfilePayoutInfoResponse"];

export type GetBillingProfilePayoutInfoByIdPortResponse = HttpStorageResponse<GetBillingProfilePayoutInfoByIdResponse>;

type GetBillingProfilePayoutInfoByIdPathParams = operations["getProgram"]["parameters"]["path"];

export type GetBillingProfilePayoutInfoByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfilePayoutInfoByIdPathParams;
}>;
