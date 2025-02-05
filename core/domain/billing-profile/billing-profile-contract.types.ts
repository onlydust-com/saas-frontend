import { BillingProfileInvoicePreviewInterface } from "@/core/domain/billing-profile/models/billing-profile-invoice-preview-model";
import { BillingProfileInvoiceableRewardInterface } from "@/core/domain/billing-profile/models/billing-profile-invoiceable-rewards-model";
import { BillingProfileInterface } from "@/core/domain/billing-profile/models/billing-profile-model";
import { BillingProfilePayoutInfoInterface } from "@/core/domain/billing-profile/models/billing-profile-payout-info-model";
import { BillingProfileShortInterface } from "@/core/domain/billing-profile/models/billing-profile-short-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { BillingProfileInvoiceInterface } from "./models/billing-profile-invoice-model";

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

export type GetBillingProfileInvoicePreviewByIdModel = BillingProfileInvoicePreviewInterface;

type GetBillingProfileInvoicePreviewByIdPathParams = operations["previewNewInvoiceForRewardIds"]["parameters"]["path"];
type GetBillingProfileInvoicePreviewByIdQueryParams =
  operations["previewNewInvoiceForRewardIds"]["parameters"]["query"];

export type GetBillingProfileInvoicePreviewByIdPortParams = HttpClientParameters<{
  PathParams: GetBillingProfileInvoicePreviewByIdPathParams;
  QueryParams: GetBillingProfileInvoicePreviewByIdQueryParams;
}>;

export type GetBillingProfileInvoicePreviewByIdPortResponse =
  HttpStorageResponse<GetBillingProfileInvoicePreviewByIdModel>;

/* ------------------------ Upload Billing Profile Invoice by ID ------------------------ */

type DownloadBillingProfileInvoiceByIdPathParams = operations["downloadInvoice"]["parameters"]["path"];
type DownloadBillingProfileInvoiceByIdQueryParams = operations["downloadInvoice"]["parameters"]["query"];

export type DownloadBillingProfileInvoiceByIdPortParams = HttpClientParameters<{
  PathParams: DownloadBillingProfileInvoiceByIdPathParams;
  QueryParams: DownloadBillingProfileInvoiceByIdQueryParams;
}>;

export type DownloadBillingProfileInvoiceByIdPortResponse = HttpStorageResponse<Blob>;

/* ------------------------ Download Billing Profile Invoice by ID ------------------------ */

type UploadBillingProfileInvoiceByIdPathParams = operations["uploadInvoice"]["parameters"]["path"];
type UploadBillingProfileInvoiceByIdQueryParams = operations["uploadInvoice"]["parameters"]["query"];

export type UploadBillingProfileInvoiceByIdPortParams = HttpClientParameters<{
  PathParams: UploadBillingProfileInvoiceByIdPathParams;
  QueryParams: UploadBillingProfileInvoiceByIdQueryParams;
}>;

export type UploadBillingProfileInvoiceByIdPortResponse = HttpStorageResponse<Blob>;

/* --------------------- Accept Billing Profile Mandate by ID --------------------- */

export type AcceptOrDeclineBillingProfileMandateBody = components["schemas"]["InvoiceMandateRequest"];

type AcceptOrDeclineBillingProfileMandatePathParams = operations["acceptOrDeclineInvoiceMandate"]["parameters"]["path"];

export type AcceptOrDeclineBillingProfileMandatePortParams = HttpClientParameters<{
  PathParams: AcceptOrDeclineBillingProfileMandatePathParams;
}>;

export type AcceptOrDeclineBillingProfileMandatePortResponse = HttpStorageResponse;

/* ------------------------ Get Me Billing Profiles ------------------------ */

export type GetMeBillingProfilesResponse = components["schemas"]["MyBillingProfilesResponse"];

export type GetMeBillingProfilesModel = Omit<GetMeBillingProfilesResponse, "billingProfiles"> & {
  billingProfiles: BillingProfileShortInterface[];
};

export type GetMeBillingProfilesPortParams = HttpClientParameters<object>;

export type GetMeBillingProfilesPortResponse = HttpStorageResponse<GetMeBillingProfilesModel>;

/* ------------------------ Get Billing Profile Invoiceable Rewards ------------------------ */

export type GetBillingProfileInvoiceableRewardsResponse =
  components["schemas"]["BillingProfileInvoiceableRewardsResponse"];
export type GetBillingProfileInvoiceableRewardsModel = Omit<GetBillingProfileInvoiceableRewardsResponse, "rewards"> & {
  rewards: BillingProfileInvoiceableRewardInterface[];
};

type GetBillingProfileInvoiceableRewardsPathParams = operations["getInvoiceableRewards"]["parameters"]["path"];

export type GetBillingProfileInvoiceableRewardsPortParams = HttpClientParameters<{
  PathParams: GetBillingProfileInvoiceableRewardsPathParams;
}>;

export type GetBillingProfileInvoiceableRewardsPortResponse =
  HttpStorageResponse<GetBillingProfileInvoiceableRewardsModel>;

/* ------------------------ Get Billing Profile Invoices ------------------------ */

export type GetBillingProfileInvoicesResponse = components["schemas"]["BillingProfileInvoicesPageResponse"];

export type GetBillingProfileInvoicesModel = Omit<GetBillingProfileInvoicesResponse, "invoices"> & {
  invoices: BillingProfileInvoiceInterface[];
};

type GetBillingProfileInvoicesPathParams = operations["getInvoices"]["parameters"]["path"];
type GetBillingProfileInvoicesQueryParams = operations["getInvoices"]["parameters"]["query"];

export type GetBillingProfileInvoicesPortParams = HttpClientParameters<{
  PathParams: GetBillingProfileInvoicesPathParams;
  QueryParams: GetBillingProfileInvoicesQueryParams;
}>;

export type GetBillingProfileInvoicesPortResponse = HttpStorageResponse<GetBillingProfileInvoicesModel>;

/* ------------------------ Accept Or Reject Coworker Invitation ------------------------ */

export type AcceptOrRejectCoworkerInvitationBody =
  components["schemas"]["BillingProfileCoworkerInvitationUpdateRequest"];

type AcceptOrRejectCoworkerInvitationPathParams = operations["acceptOrRejectCoworkerInvitation"]["parameters"]["path"];

export type AcceptOrRejectCoworkerInvitationPortParams = HttpClientParameters<{
  PathParams: AcceptOrRejectCoworkerInvitationPathParams;
}>;

export type AcceptOrRejectCoworkerInvitationPortResponse = HttpStorageResponse;

/* ------------------------ Delete Billing Profile ------------------------ */

type DeleteBillingProfilePathParams = operations["deleteBillingProfile"]["parameters"]["path"];

export type DeleteBillingProfilePortParams = HttpClientParameters<{
  PathParams: DeleteBillingProfilePathParams;
}>;

export type DeleteBillingProfilePortResponse = HttpStorageResponse;

/* ------------------------ Enable  Billing Profile ------------------------ */

export type EnableBillingProfileBody = components["schemas"]["BillingProfileEnableRequest"];

type EnableBillingProfilePathParams = operations["enableBillingProfile"]["parameters"]["path"];

export type EnableBillingProfilePortParams = HttpClientParameters<{
  PathParams: EnableBillingProfilePathParams;
}>;

export type EnableBillingProfilePortResponse = HttpStorageResponse;

/* ------------------------ Remove Coworker From Billing Profile ------------------------ */

type RemoveCoworkerFromBillingProfilePathParams = operations["removeCoworker"]["parameters"]["path"];

export type RemoveCoworkerFromBillingProfilePortParams = HttpClientParameters<{
  PathParams: RemoveCoworkerFromBillingProfilePathParams;
}>;

export type RemoveCoworkerFromBillingProfilePortResponse = HttpStorageResponse;

/* ------------------------ Create Billing Profile ------------------------ */

export type CreateBillingProfileResponse = components["schemas"]["BillingProfileCreateResponse"];

export type CreateBillingProfileBody = components["schemas"]["BillingProfileRequest"];

type CreateBillingProfilePathParams = operations["createBillingProfile"]["parameters"]["path"];

export type CreateBillingProfilePortParams = HttpClientParameters<{
  PathParams: CreateBillingProfilePathParams;
}>;

export type CreateBillingProfilePortResponse = HttpStorageResponse<CreateBillingProfileResponse>;
