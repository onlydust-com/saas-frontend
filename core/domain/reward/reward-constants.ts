import { Building2, Check, Hourglass, Lock, LogIn, TriangleAlert, Users, Wallet } from "lucide-react";

import { GetProjectRewardsResponse } from "@/core/domain/reward/reward-contract.types";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export type PayoutStatus = GetProjectRewardsResponse["rewards"][0]["status"];

export interface PayoutStatusContent {
  type: "error" | "warning" | "success" | "info";
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
    icon: { component: LogIn },
    label: "features:payoutStatus.statuses.pendingSignup",
    type: "error",
  },
  PENDING_CONTRIBUTOR: {
    icon: { component: Users },
    label: "features:payoutStatus.statuses.pendingContributor",
    type: "info",
  },
  PENDING_BILLING_PROFILE: {
    icon: { component: TriangleAlert },
    label: "features:payoutStatus.statuses.pendingBillingProfile",
    type: "warning",
  },
  PENDING_COMPANY: {
    icon: { component: Building2 },
    label: "features:payoutStatus.statuses.pendingCompany",
    type: "warning",
  },
  PENDING_VERIFICATION: {
    icon: { component: TriangleAlert },
    label: "features:payoutStatus.statuses.pendingVerification",
    type: "warning",
  },
  GEO_BLOCKED: {
    icon: { component: TriangleAlert },
    label: "features:payoutStatus.statuses.geoBlocked",
    type: "error",
  },
  INDIVIDUAL_LIMIT_REACHED: {
    icon: { component: TriangleAlert },
    label: "features:payoutStatus.statuses.individualLimitReached",
    type: "error",
  },
  PAYOUT_INFO_MISSING: {
    icon: { component: Wallet },
    label: "features:payoutStatus.statuses.payoutInfoMissing",
    type: "warning",
  },
  LOCKED: {
    icon: { component: Lock },
    label: "features:payoutStatus.statuses.locked",
    type: "info",
  },
  PENDING_REQUEST: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.pendingRequest",
    type: "info",
  },
  PROCESSING: {
    icon: { component: Hourglass },
    label: "features:payoutStatus.statuses.processing",
    type: "info",
  },
  COMPLETE: {
    icon: { component: Check },
    label: "features:payoutStatus.statuses.complete",
    type: "success",
  },
};
