import { DetailedTotalMoney } from "@/core/kernel/money/money.types";

export type PanelType = "totalAllocated" | "totalAvailable" | "totalGranted" | "totalRewarded";

export interface FinancialDetailSidepanelData {
  panelType: PanelType;
  total: DetailedTotalMoney;
}

export const colorMapping: Record<PanelType, "gradient" | "grey"> = {
  totalAvailable: "gradient",
  totalAllocated: "grey",
  totalGranted: "grey",
  totalRewarded: "grey",
};
