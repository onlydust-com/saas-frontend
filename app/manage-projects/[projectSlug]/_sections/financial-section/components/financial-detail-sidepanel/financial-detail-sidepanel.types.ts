import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";

export type PanelType = "totalAvailable" | "totalRewarded";

export interface FinancialDetailSidepanelProps {
  panelType: PanelType;
  projectFinancial: ProjectFinancialInterface;
}

export const colorMapping: Record<PanelType, "gradient" | "grey"> = {
  totalAvailable: "gradient",
  totalRewarded: "grey",
};
