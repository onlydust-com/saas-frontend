import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BillingProfileShortResponse = components["schemas"]["ShortBillingProfileResponse"];

export interface BillingProfileShortInterface extends BillingProfileShortResponse {}

export class BillingProfileShort implements BillingProfileShortInterface {
  currentYearPaymentAmount!: BillingProfileShortResponse["currentYearPaymentAmount"];
  currentYearPaymentLimit!: BillingProfileShortResponse["currentYearPaymentLimit"];
  enabled!: BillingProfileShortResponse["enabled"];
  id!: BillingProfileShortResponse["id"];
  individualLimitReached!: BillingProfileShortResponse["individualLimitReached"];
  invoiceMandateAccepted!: BillingProfileShortResponse["invoiceMandateAccepted"];
  invoiceableRewardCount!: BillingProfileShortResponse["invoiceableRewardCount"];
  missingPayoutInfo!: BillingProfileShortResponse["missingPayoutInfo"];
  missingVerification!: BillingProfileShortResponse["missingVerification"];
  name!: BillingProfileShortResponse["name"];
  pendingInvitationResponse!: BillingProfileShortResponse["pendingInvitationResponse"];
  requestableRewardCount!: BillingProfileShortResponse["requestableRewardCount"];
  rewardCount!: BillingProfileShortResponse["rewardCount"];
  role!: BillingProfileShortResponse["role"];
  type!: BillingProfileShortResponse["type"];
  verificationBlocked!: BillingProfileShortResponse["verificationBlocked"];

  constructor(props: BillingProfileShortResponse) {
    Object.assign(this, props);
  }
}
