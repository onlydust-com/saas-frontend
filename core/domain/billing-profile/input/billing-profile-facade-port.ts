import {
  GetBillingProfileByIdPortParams,
  GetBillingProfileByIdPortResponse,
  GetBillingProfilePayoutInfoByIdPortParams,
  GetBillingProfilePayoutInfoByIdPortResponse,
} from "@/core/domain/billing-profile/billing-profile-contract.types";

export interface BillingProfileFacadePort {
  getBillingProfileById(p: GetBillingProfileByIdPortParams): GetBillingProfileByIdPortResponse;
  getBillingProfilePayoutInfoById(
    p: GetBillingProfilePayoutInfoByIdPortParams
  ): GetBillingProfilePayoutInfoByIdPortResponse;
}
