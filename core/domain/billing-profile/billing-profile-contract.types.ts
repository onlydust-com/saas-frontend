import { BillingProfileInterface } from "@/core/domain/billing-profile/models/billing-profile-model";
import { BillingProfilePayoutInfoInterface } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Billing Profile by ID ------------------------------ */

export type GetBillingProfileByIdResponse = components["schemas"]["BillingProfileResponse"];

export type GetBillingProfileByIdModel = BillingProfileInterface;

type GetBillingProfileByIdPathParams = operations["getProgram"]["parameters"]["path"];

export type GetBillingProfileByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfileByIdPathParams;
}>;

export type GetBillingProfileByIdPortResponse = HttpStorageResponse<GetBillingProfileByIdModel>;

/* ------------------------------ Get Billing Profile Payout Info by ID ------------------------------ */

export type GetBillingProfilePayoutInfoByIdResponse = components["schemas"]["BillingProfilePayoutInfoResponse"];

export type GetBillingProfilePayoutInfoByIdModel = BillingProfilePayoutInfoInterface;

type GetBillingProfilePayoutInfoByIdPathParams = operations["getProgram"]["parameters"]["path"];

export type GetBillingProfilePayoutInfoByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfilePayoutInfoByIdPathParams;
}>;

export type GetBillingProfilePayoutInfoByIdPortResponse = HttpStorageResponse<GetBillingProfilePayoutInfoByIdModel>;
