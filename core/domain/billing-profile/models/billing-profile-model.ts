import { BillingProfileRole, BillingProfileType } from "@/core/domain/billing-profile/billing-profile.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BillingProfileResponse = components["schemas"]["BillingProfileResponse"];

export interface BillingProfileInterface extends BillingProfileResponse {
  isIndividualLimitReached(): boolean;
  getLimitAmount(): number | null;
  getCurrentYearPaymentAmount(): number;
  isBillingProfileIndividual(): boolean;
  isBillingProfileCompany(): boolean;
  isBillingProfileSelfEmployed(): boolean;
  getTypeLabel(): string | undefined;
  isAdmin(): boolean;
  isInvited(): boolean;
  hasRole(): boolean;
  getStatus(): {
    label: string;
    type: "error" | "warning" | "success";
  };
}

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

  isIndividualLimitReached() {
    return this.individualLimitReached || false;
  }

  getLimitAmount() {
    if (!this.currentYearPaymentLimit) {
      return null;
    }

    return this.currentYearPaymentLimit > 0 ? this.currentYearPaymentLimit - 1 : this.currentYearPaymentLimit;
  }

  getCurrentYearPaymentAmount() {
    return this.currentYearPaymentAmount || 0;
  }

  isBillingProfileIndividual() {
    return this.type === BillingProfileType.Individual;
  }

  isBillingProfileCompany() {
    return this.type === BillingProfileType.Company;
  }

  isBillingProfileSelfEmployed() {
    return this.type === BillingProfileType.SelfEmployed;
  }

  getTypeLabel() {
    if (this.isBillingProfileIndividual()) {
      return "Individual";
    }

    if (this.isBillingProfileCompany()) {
      return "Company";
    }

    if (this.isBillingProfileSelfEmployed()) {
      return "Self-Employed";
    }
  }

  isAdmin() {
    return this.me.role === BillingProfileRole.Admin;
  }

  isInvited() {
    return Boolean(this.me.invitation?.invitedBy);
  }

  hasRole() {
    return Boolean(this.me.role);
  }

  getStatus() {
    switch (this.status) {
      case "CLOSED":
        return {
          label: "Closed",
          type: "error",
        } as const;
      case "NOT_STARTED":
        return {
          label: "Not Started",
          type: "warning",
        } as const;
      case "REJECTED":
        return {
          label: "Rejected",
          type: "error",
        } as const;
      case "STARTED":
        return {
          label: "Started",
          type: "warning",
        } as const;
      case "UNDER_REVIEW":
        return {
          label: "Under Review",
          type: "warning",
        } as const;
      case "VERIFIED":
        return {
          label: "Verified",
          type: "success",
        } as const;
    }
  }
}
