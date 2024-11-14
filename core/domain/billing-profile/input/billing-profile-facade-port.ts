import {
  AcceptOrDeclineBillingProfileMandatePortParams,
  AcceptOrDeclineBillingProfileMandatePortResponse,
  GetBillingProfileByIdPortParams,
  GetBillingProfileByIdPortResponse,
  GetBillingProfileInvoicePreviewByIdPortParams,
  GetBillingProfileInvoicePreviewByIdPortResponse,
  GetBillingProfileInvoiceableRewardsPortParams,
  GetBillingProfileInvoiceableRewardsPortResponse,
  GetBillingProfilePayoutInfoByIdPortParams,
  GetBillingProfilePayoutInfoByIdPortResponse,
  GetMeBillingProfilesPortParams,
  GetMeBillingProfilesPortResponse,
  UploadBillingProfileInvoiceByIdPortParams,
  UploadBillingProfileInvoiceByIdPortResponse,
} from "@/core/domain/billing-profile/billing-profile-contract.types";

export interface BillingProfileFacadePort {
  getBillingProfileById(p: GetBillingProfileByIdPortParams): GetBillingProfileByIdPortResponse;
  getBillingProfilePayoutInfoById(
    p: GetBillingProfilePayoutInfoByIdPortParams
  ): GetBillingProfilePayoutInfoByIdPortResponse;
  getBillingProfileInvoicePreviewById(
    p: GetBillingProfileInvoicePreviewByIdPortParams
  ): GetBillingProfileInvoicePreviewByIdPortResponse;
  uploadBillingProfileInvoiceById(
    p: UploadBillingProfileInvoiceByIdPortParams
  ): UploadBillingProfileInvoiceByIdPortResponse;
  acceptOrDeclineBillingProfileMandateById(
    p: AcceptOrDeclineBillingProfileMandatePortParams
  ): AcceptOrDeclineBillingProfileMandatePortResponse;
  getMyBillingProfiles(p: GetMeBillingProfilesPortParams): GetMeBillingProfilesPortResponse;
  getBillingProfileInvoiceableRewards(
    p: GetBillingProfileInvoiceableRewardsPortParams
  ): GetBillingProfileInvoiceableRewardsPortResponse;
}
