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

type GetBillingProfileByIdPathParams = operations["getBillingProfile"]["parameters"]["path"];

export type GetBillingProfileByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfileByIdPathParams;
}>;

export type GetBillingProfileByIdPortResponse = HttpStorageResponse<GetBillingProfileByIdModel>;

/* ------------------------------ Get Billing Profile Payout Info by ID ------------------------------ */

export type GetBillingProfilePayoutInfoByIdResponse = components["schemas"]["BillingProfilePayoutInfoResponse"];

export type GetBillingProfilePayoutInfoByIdModel = BillingProfilePayoutInfoInterface;

type GetBillingProfilePayoutInfoByIdPathParams = operations["getPayoutInfo"]["parameters"]["path"];

export type GetBillingProfilePayoutInfoByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfilePayoutInfoByIdPathParams;
}>;

export type GetBillingProfilePayoutInfoByIdPortResponse = HttpStorageResponse<GetBillingProfilePayoutInfoByIdModel>;

/* ------------------------------ Get Billing Profile Invoice Preview by ID ------------------------------ */

export type GetBillingProfileInvoicePreviewByIdResponse = components["schemas"]["InvoicePreviewResponse"];

type GetBillingProfileInvoicePreviewByIdPathParams = operations["previewNewInvoiceForRewardIds"]["parameters"]["path"];
type GetBillingProfileInvoicePreviewByIdQueryParams =
  operations["previewNewInvoiceForRewardIds"]["parameters"]["query"];

export type GetBillingProfileInvoicePreviewByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfileInvoicePreviewByIdPathParams;
  QueryParams: GetBillingProfileInvoicePreviewByIdQueryParams;
}>;

export type GetBillingProfileInvoicePreviewByIdPortResponse = HttpStorageResponse<Blob>;

/* ------------------------ Upload Billing Profile Invoice by ID ------------------------ */

type UploadBillingProfileInvoiceByIdPathParams = operations["uploadInvoice"]["parameters"]["path"];

export type UploadBillingProfileInvoiceByIdPortParams = HttpClientParameters<{
  PathParams: UploadBillingProfileInvoiceByIdPathParams;
}>;

export type UploadBillingProfileInvoiceByIdPortResponse = HttpStorageResponse<Blob>;

/* --------------------- Accept Billing Profile Mandate by ID --------------------- */

export type AcceptOrDeclineBillingProfileMandateBody = components["schemas"]["InvoiceMandateRequest"];

type AcceptOrDeclineBillingProfileMandatePathParams = operations["acceptOrDeclineInvoiceMandate"]["parameters"]["path"];

export type AcceptOrDeclineBillingProfileMandatePortParams = HttpClientParameters<{
  PathParams: AcceptOrDeclineBillingProfileMandatePathParams;
}>;

export type AcceptOrDeclineBillingProfileMandatePortResponse = HttpStorageResponse;
