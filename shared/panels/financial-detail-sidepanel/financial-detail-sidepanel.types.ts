import { ReactNode } from "react";

import { DetailedTotalMoney } from "@/core/kernel/money/money.types";

export type PanelMaintainerType = "totalAllocated" | "totalAvailable" | "totalGranted" | "totalRewarded";
export type PanelContributorType = "rewardedAmount" | "rewardPendingAmount" | "rewardPaid";

export type PanelType = PanelMaintainerType | PanelContributorType;

export interface FinancialDetailSidepanelData {
  panelType: PanelType;
  total: DetailedTotalMoney;
}

export interface FinancialDetailSidepanelProps {
  footer?: ReactNode;
}

export const colorMapping: Record<PanelType, "gradient" | "grey"> = {
  totalAvailable: "gradient",
  totalAllocated: "grey",
  totalGranted: "grey",
  totalRewarded: "grey",
  rewardedAmount: "gradient",
  rewardPendingAmount: "grey",
  rewardPaid: "grey",
};
