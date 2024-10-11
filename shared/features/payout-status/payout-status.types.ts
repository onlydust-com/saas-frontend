import { Hourglass } from "lucide-react";

import { GetProjectRewardsResponse } from "@/core/domain/reward/reward-contract.types";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export type PayoutStatus = GetProjectRewardsResponse["rewards"][0]["status"];

interface PayoutStatusContent {
  type: "error" | "warning" | "success";
  label: TranslateProps["token"];
  icon: IconPort;
}

export enum PayoutStatusEnum {
  PENDING_SIGNUP = "PENDING_SIGNUP",
  PENDING_CONTRIBUTOR = "PENDING_CONTRIBUTOR",
  PENDING_BILLING_PROFILE = "PENDING_BILLING_PROFILE",
  PENDING_COMPANY = "PENDING_COMPANY",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  GEO_BLOCKED = "GEO_BLOCKED",
  INDIVIDUAL_LIMIT_REACHED = "INDIVIDUAL_LIMIT_REACHED",
  PAYOUT_INFO_MISSING = "PAYOUT_INFO_MISSING",
  LOCKED = "LOCKED",
  PENDING_REQUEST = "PENDING_REQUEST",
  PROCESSING = "PROCESSING",
  COMPLETE = "COMPLETE",
}

export type PayoutStatusUnion = `${PayoutStatusEnum}`;

export const PayoutStatusMapping: Record<PayoutStatus, PayoutStatusContent> = {
  PENDING_SIGNUP: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.pendingSignup",
    type: "error",
  },
  PENDING_CONTRIBUTOR: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.pendingContributor",
    type: "warning",
  },
  PENDING_BILLING_PROFILE: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.pendingBillingProfile",
    type: "warning",
  },
  PENDING_COMPANY: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.pendingCompany",
    type: "warning",
  },
  PENDING_VERIFICATION: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.pendingVerification",
    type: "warning",
  },
  GEO_BLOCKED: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.geoBlocked",
    type: "error",
  },
  INDIVIDUAL_LIMIT_REACHED: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.individualLimitReached",
    type: "error",
  },
  PAYOUT_INFO_MISSING: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.payoutInfoMissing",
    type: "warning",
  },
  LOCKED: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.locked",
    type: "warning",
  },
  PENDING_REQUEST: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.pendingRequest",
    type: "warning",
  },
  PROCESSING: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.processing",
    type: "warning",
  },
  COMPLETE: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.complete",
    type: "success",
  },
};

export interface PayoutStatusProps {
  status: PayoutStatus;
  dates?: {
    processedAt?: string | null;
    unlockDate?: string | null;
  };
  shouldOpenRequestPayment?: boolean;
  shouldRedirect?: boolean;
  billingProfileId?: string;
  rewardId?: string;
  projectId?: string;
  closeRewardPanel?: () => void;
}
