import { ProgramResponse } from "@/core/domain/program/models/program-model";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface CreateAvatarGroupProps {
  total: ProgramResponse["totalAvailable" | "totalGranted" | "totalRewarded"];
}

export interface FinancialCardItemProps {
  title: TranslateProps["token"];
  total: ProgramResponse["totalAvailable" | "totalGranted" | "totalRewarded"];
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
}
