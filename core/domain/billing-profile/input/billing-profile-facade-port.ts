import {
  AcceptOrDeclineBillingProfileMandatePortParams,
  AcceptOrDeclineBillingProfileMandatePortResponse,
  DeleteBillingProfileCoworkerPortParams,
  DeleteBillingProfileCoworkerPortResponse,
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
  UpdateBillingProfileCoworkerRolePortParams,
  UpdateBillingProfileCoworkerRolePortResponse,
  RemoveCoworkerFromBillingProfilePortParams,
  RemoveCoworkerFromBillingProfilePortResponse,
  UpdateBillingProfilePayoutInfoPortParams,
  UpdateBillingProfilePayoutInfoPortResponse,
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
  updateBillingProfileCoworkerRole(
    p: UpdateBillingProfileCoworkerRolePortParams
  ): UpdateBillingProfileCoworkerRolePortResponse;
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
