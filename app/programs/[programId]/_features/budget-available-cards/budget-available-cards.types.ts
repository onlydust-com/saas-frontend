import { ProgramResponse } from "@/core/domain/program/models/program-model";

export interface CreateAvatarGroupProps {
  total: ProgramResponse["totalAvailable" | "totalGranted" | "totalRewarded"];
}

export interface FinancialCardItemProps {
  title: string;
  total: ProgramResponse["totalAvailable" | "totalGranted" | "totalRewarded"];
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
}
