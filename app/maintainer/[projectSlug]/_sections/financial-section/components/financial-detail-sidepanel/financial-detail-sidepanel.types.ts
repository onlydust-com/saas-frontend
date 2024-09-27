import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";

export type PanelType = "totalAllocated" | "totalAvailable" | "totalGranted" | "totalRewarded";

export interface FinancialDetailSidepanelProps {
  panelType: PanelType;
  sponsor: SponsorInterface;
}

export const colorMapping: Record<PanelType, "gradient" | "grey"> = {
  totalAvailable: "gradient",
  totalAllocated: "grey",
  totalGranted: "grey",
  totalRewarded: "grey",
};
