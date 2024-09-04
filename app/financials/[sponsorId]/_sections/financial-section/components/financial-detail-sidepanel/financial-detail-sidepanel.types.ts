import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";

export type PanelType = "totalDeposited" | "totalAvailable" | "totalGranted" | "totalRewarded";

export interface FinancialDetailSidepanelProps {
  panelType: PanelType;
  sponsor: SponsorInterface;
}

export const colorMapping: Record<PanelType, "gradient" | "grey"> = {
  totalDeposited: "gradient",
  totalAvailable: "grey",
  totalGranted: "grey",
  totalRewarded: "grey",
};
