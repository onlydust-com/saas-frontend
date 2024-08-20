import { ProgramResponse } from "@/core/domain/program/models/program-model";

export type PanelType = "totalAvailable" | "totalGranted" | "totalRewarded";

export interface FinancialDetailSidepanelProps {
  panelType: PanelType;
  program: ProgramResponse;
}

export const colorMapping: Record<PanelType, "chart-1" | "chart-2" | "chart-3"> = {
  totalAvailable: "chart-1",
  totalGranted: "chart-2",
  totalRewarded: "chart-3",
};
