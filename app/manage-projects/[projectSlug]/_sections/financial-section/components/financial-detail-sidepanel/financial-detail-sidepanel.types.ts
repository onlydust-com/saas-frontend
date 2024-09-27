import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";

export type PanelType = "totalAvailable" | "totalRewarded";

export interface FinancialDetailSidepanelProps {
  panelType: PanelType;
  sponsor: SponsorInterface;
}

export const colorMapping: Record<PanelType, "gradient" | "grey"> = {
  totalAvailable: "gradient",
  totalRewarded: "grey",
};
