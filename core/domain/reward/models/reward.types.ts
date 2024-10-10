import { Hourglass } from "lucide-react";

import { GetProjectRewardsResponse } from "@/core/domain/reward/reward-contract.types";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

type status = GetProjectRewardsResponse["rewards"][0]["status"];

interface statusContent {
  type: "error" | "warning" | "success";
  label: TranslateProps["token"];
  icon: IconPort;
}

export const RewardStatusMapping: Record<status, statusContent> = {
  PENDING_SIGNUP: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.pendingSignup",
    type: "error",
  },
  PENDING_CONTRIBUTOR: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.pendingContributor",
    type: "warning",
  },
  PENDING_BILLING_PROFILE: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.pendingBillingProfile",
    type: "warning",
  },
  PENDING_COMPANY: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.pendingCompany",
    type: "warning",
  },
  PENDING_VERIFICATION: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.pendingVerification",
    type: "warning",
  },
  GEO_BLOCKED: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.geoBlocked",
    type: "error",
  },
  INDIVIDUAL_LIMIT_REACHED: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.individualLimitReached",
    type: "error",
  },
  PAYOUT_INFO_MISSING: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.payoutInfoMissing",
    type: "warning",
  },
  LOCKED: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.locked",
    type: "warning",
  },
  PENDING_REQUEST: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.pendingRequest",
    type: "warning",
  },
  PROCESSING: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.processing",
    type: "warning",
  },
  COMPLETE: {
    icon: { component: Hourglass },
    label: "manageProjects:detail.rewardsTable.statuses.complete",
    type: "success",
  },
};
