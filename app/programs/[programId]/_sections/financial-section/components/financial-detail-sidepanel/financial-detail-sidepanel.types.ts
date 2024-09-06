import { ProgramInterface } from "@/core/domain/program/models/program-model";

export type PanelType = "totalAvailable" | "totalGranted" | "totalRewarded";

export interface FinancialDetailSidepanelProps {
  panelType: PanelType;
  program: ProgramInterface;
}

export const colorMapping: Record<PanelType, "gradient" | "grey"> = {
  totalAvailable: "gradient",
  totalGranted: "grey",
  totalRewarded: "grey",
};
