import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BillingProfileResponse = components["schemas"]["BillingProfileResponse"];

export interface BillingProfileInterface extends BillingProfileResponse {}

export class BillingProfile implements BillingProfileInterface {
  currentYearPaymentAmount!: BillingProfileResponse["currentYearPaymentAmount"];
  currentYearPaymentLimit!: BillingProfileResponse["currentYearPaymentLimit"];
  enabled!: BillingProfileResponse["enabled"];
  id!: BillingProfileResponse["id"];
  individualLimitReached!: BillingProfileResponse["individualLimitReached"];
  invoiceMandateAccepted!: BillingProfileResponse["invoiceMandateAccepted"];
  invoiceableRewardCount!: BillingProfileResponse["invoiceableRewardCount"];
  isSwitchableToSelfEmployed!: BillingProfileResponse["isSwitchableToSelfEmployed"];
  kyb!: BillingProfileResponse["kyb"];
  kyc!: BillingProfileResponse["kyc"];
  me!: BillingProfileResponse["me"];
  missingPayoutInfo!: BillingProfileResponse["missingPayoutInfo"];
  missingVerification!: BillingProfileResponse["missingVerification"];
  name!: BillingProfileResponse["name"];
  rewardCount!: BillingProfileResponse["rewardCount"];
  status!: BillingProfileResponse["status"];
  type!: BillingProfileResponse["type"];
  verificationBlocked!: BillingProfileResponse["verificationBlocked"];

  constructor(props: BillingProfileResponse) {
    Object.assign(this, props);
  }
}
