import {
  AcceptOrDeclineBillingProfileMandatePortParams,
  AcceptOrDeclineBillingProfileMandatePortResponse,
  AcceptOrRejectCoworkerInvitationPortParams,
  AcceptOrRejectCoworkerInvitationPortResponse,
  CreateBillingProfilePortParams,
  CreateBillingProfilePortResponse,
  DeleteBillingProfilePortParams,
  DeleteBillingProfilePortResponse,
  DownloadBillingProfileInvoiceByIdPortParams,
  DownloadBillingProfileInvoiceByIdPortResponse,
  EnableBillingProfilePortParams,
  EnableBillingProfilePortResponse,
  GetBillingProfileByIdPortParams,
  GetBillingProfileByIdPortResponse,
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
  RemoveCoworkerFromBillingProfilePortParams,
  RemoveCoworkerFromBillingProfilePortResponse,
  UpdateBillingProfilePayoutInfoPortParams,
  UpdateBillingProfilePayoutInfoPortResponse,
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
  acceptOrRejectCoworkerInvitation(
    p: AcceptOrRejectCoworkerInvitationPortParams
  ): AcceptOrRejectCoworkerInvitationPortResponse;
  deleteBillingProfile(p: DeleteBillingProfilePortParams): DeleteBillingProfilePortResponse;
  enableBillingProfile(p: EnableBillingProfilePortParams): EnableBillingProfilePortResponse;
  removeCoworkerFromBillingProfile(
    p: RemoveCoworkerFromBillingProfilePortParams
  ): RemoveCoworkerFromBillingProfilePortResponse;
  createBillingProfile(p: CreateBillingProfilePortParams): CreateBillingProfilePortResponse;
  updateBillingProfilePayoutInfo(
    p: UpdateBillingProfilePayoutInfoPortParams
  ): UpdateBillingProfilePayoutInfoPortResponse;
}
