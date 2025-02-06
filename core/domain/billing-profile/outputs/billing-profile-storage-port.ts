import {
  AcceptOrDeclineBillingProfileMandatePortParams,
  AcceptOrDeclineBillingProfileMandatePortResponse,
  DeleteBillingProfileCoworkerPortParams,
  DeleteBillingProfileCoworkerPortResponse,
  DownloadBillingProfileInvoiceByIdPortParams,
  DownloadBillingProfileInvoiceByIdPortResponse,
  GetBillingProfileByIdPortParams,
  GetBillingProfileByIdPortResponse,
  GetBillingProfileCoworkersPortParams,
  GetBillingProfileCoworkersPortResponse,
  GetBillingProfileInvoicePreviewByIdPortParams,
  GetBillingProfileInvoicePreviewByIdPortResponse,
  GetBillingProfileInvoiceableRewardsPortParams,
  GetBillingProfileInvoiceableRewardsPortResponse,
  GetBillingProfileInvoicesPortParams,
  GetBillingProfileInvoicesPortResponse,
  GetBillingProfilePayoutInfoByIdPortParams,
  GetBillingProfilePayoutInfoByIdPortResponse,
  GetMeBillingProfilesPortParams,
  GetMeBillingProfilesPortResponse,
  InviteBillingProfileCoworkerPortParams,
  InviteBillingProfileCoworkerPortResponse,
  UploadBillingProfileInvoiceByIdPortParams,
  UploadBillingProfileInvoiceByIdPortResponse,
} from "@/core/domain/billing-profile/billing-profile-contract.types";

export interface BillingProfileStoragePort {
  routes: Record<string, string>;
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
  downloadBillingProfileInvoiceById(
    p: DownloadBillingProfileInvoiceByIdPortParams
  ): DownloadBillingProfileInvoiceByIdPortResponse;
  acceptOrDeclineBillingProfileMandateById(
    p: AcceptOrDeclineBillingProfileMandatePortParams
  ): AcceptOrDeclineBillingProfileMandatePortResponse;
  getMyBillingProfiles(p: GetMeBillingProfilesPortParams): GetMeBillingProfilesPortResponse;
  getBillingProfileInvoiceableRewards(
    p: GetBillingProfileInvoiceableRewardsPortParams
  ): GetBillingProfileInvoiceableRewardsPortResponse;
  getBillingProfileInvoices(p: GetBillingProfileInvoicesPortParams): GetBillingProfileInvoicesPortResponse;
  getBillingProfileCoworkers(p: GetBillingProfileCoworkersPortParams): GetBillingProfileCoworkersPortResponse;
  inviteBillingProfileCoworker(p: InviteBillingProfileCoworkerPortParams): InviteBillingProfileCoworkerPortResponse;
  deleteBillingProfileCoworker(p: DeleteBillingProfileCoworkerPortParams): DeleteBillingProfileCoworkerPortResponse;
}
